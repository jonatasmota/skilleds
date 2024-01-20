import connectMongoDB from "@/lib/mongodb";
import Book from "@/models/books";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;

  await connectMongoDB();

  const book = await Book.findOne({ _id: id });

  return NextResponse.json({ book }, { status: 200 });
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;

    const { status: newStatus } = await request.json();

    console.log("Updating status...", id, newStatus);

    await connectMongoDB();

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );

    console.log("Book updated", updatedBook);

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
