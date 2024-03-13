import connectMongoDB from "@/lib/mongodb";
import List from "@/models/list";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { userId } = auth();
    const { title, order, cards } = await req.json();

    if (!userId)
      return new NextResponse("User not authenticated", { status: 401 });

    await connectMongoDB();

    await List.create({
      title,
      order,
      cards,
      userId,
    });

    return NextResponse.json(
      { message: "List created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error creating list", { status: 500 });
  }
}

export async function GET(req: Request, res: Response) {
  try {
    const { userId } = auth();

    if (!userId)
      return new NextResponse("User not authenticated", { status: 401 });

    await connectMongoDB();

    const lists = await List.find({ userId });

    return NextResponse.json(lists);
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error getting lists", { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { userId } = auth();

    if (!userId)
      return new NextResponse("User not authenticated", { status: 401 });

    const {
      newTitle: title,
      newOrder: order,
      newCards: cards,
    } = await request.json();

    await connectMongoDB();

    const updatedList = await List.findByIdAndUpdate(
      id,
      {
        title,
        order,
        cards,
      },
      { new: true }
    );

    console.log("List updated", updatedList);

    return NextResponse.json(
      { message: "List updated", book: updatedList },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: {
  nextUrl: { searchParams: { get: (arg0: string) => any } };
}) {
  const id = request.nextUrl.searchParams.get("id");
  const { userId } = auth();

  await connectMongoDB();

  await List.findByIdAndDelete({ _id: id, userId });

  return NextResponse.json({ message: "List deleted successfully" });
}
