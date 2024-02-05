import connectMongoDB from "@/lib/mongodb";
import Board from "@/models/boards";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { userId } = auth();

    const { title, description, position } = await req.json();

    if (!userId)
      return new NextResponse("User not authenticated", { status: 401 });

    await connectMongoDB();

    await Board.create({
      userId,
      title,
      description,
      position,
    });

    return NextResponse.json(
      { message: "Board created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error creating board", { status: 500 });
  }
}

export async function GET(req: Request, res: Response) {
  try {
    const { userId } = auth();

    if (!userId)
      return new NextResponse("User not authenticated", { status: 401 });

    await connectMongoDB();

    const boards = await Board.find({ userId });

    return NextResponse.json(boards);
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error getting boards", { status: 500 });
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
      newDescription: description,
      newPosition: position,
    } = await request.json();

    await connectMongoDB();

    const updatedBoard = await Board.findByIdAndUpdate(
      id,
      {
        title,
        description,
        position,
      },
      { new: true }
    );

    console.log("Board updated", updatedBoard);

    return NextResponse.json(
      { message: "Board updated", board: updatedBoard },
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

  await Board.findByIdAndDelete({ _id: id, userId });

  return NextResponse.json({ message: "Idea deleted successfully" });
}
