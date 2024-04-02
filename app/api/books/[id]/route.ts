import connectMongoDB from "@/lib/mongodb";
import Book from "@/models/books";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

// Sua rota GET
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { userId } = auth();

    if (!userId)
      return new NextResponse("User not authenticated", { status: 401 });

    await connectMongoDB();

    const book = await Book.findOne({ _id: id, userId });

    if (!book) return new NextResponse("Book not found", { status: 404 });

    return NextResponse.json({ book }, { status: 200 });
  } catch (error) {
    console.error("Error getting book:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { status: newStatus } = await request.json();
    const { userId } = auth();

    if (!userId)
      return new NextResponse("User not authenticated", { status: 401 });

    await connectMongoDB();

    const updatedBook = await Book.findOneAndUpdate(
      { _id: id, userId },
      { status: newStatus },
      { new: true }
    );

    if (!updatedBook)
      return new NextResponse("Book not found or unauthorized", {
        status: 404,
      });

    return NextResponse.json(
      { message: "Status updated", book: updatedBook },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
