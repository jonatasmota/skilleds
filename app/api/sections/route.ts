import connectMongoDB from "@/lib/mongodb";
import Section from "@/models/sections";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { userId } = auth();

    const { title, order, boardId } = await req.json();
    console.log(boardId)

    if (!userId)
      return new NextResponse("User not authenticated", { status: 401 });

    await connectMongoDB();

    await Section.create({
      userId,
      title,
      order,
      board: boardId,
    });

    return NextResponse.json(
      { message: "Section created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error creating section", { status: 500 });
  }
}

export async function GET(req: Request, res: Response) {
  try {
    const { userId } = auth();

    if (!userId)
      return new NextResponse("User not authenticated", { status: 401 });

    await connectMongoDB();

    const sections = await Section.find({ userId });

    return NextResponse.json(sections);
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error getting sections", { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { userId } = auth();

    if (!userId)
      return new NextResponse("User not authenticated", { status: 401 });

    const { newTitle: title, newPosition: position } = await request.json();

    await connectMongoDB();

    const updatedSection = await Section.findByIdAndUpdate(
      id,
      {
        title,
        position,
      },
      { new: true }
    );

    console.log("Section updated", updatedSection);

    return NextResponse.json(
      { message: "Board updated", board: updatedSection },
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

  await Section.findByIdAndDelete({ _id: id, userId });

  return NextResponse.json({ message: "Section deleted successfully" });
}
