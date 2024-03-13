import connectMongoDB from "@/lib/mongodb";
import Board from "@/models/boards";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { userId } = auth();
    const { id } = params;

    const {
      newTitle: title,
      newOrder: order,
      newBoard: board,
    } = await request.json();

    if (!userId)
      return new NextResponse("User not authenticated", { status: 401 });

    await connectMongoDB();

    const updatedBoard = await Board.findByIdAndUpdate(
      { _id: id, userId },
      { title, order, board },
      { new: true }
    );

    return NextResponse.json({ message: "Board updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error updating board", { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    const { userId } = auth();
    const { id } = params;

    if (!userId)
      return new NextResponse("User not authenticated", { status: 401 });

    await connectMongoDB();

    const board = await Board.findOne({ _id: id, userId });

    if (!board) return new NextResponse("Board not found", { status: 404 });

    return NextResponse.json(board, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error getting board", { status: 500 });
  }
}
