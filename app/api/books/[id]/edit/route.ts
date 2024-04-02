import connectMongoDB from "@/lib/mongodb";
import Book from "@/models/books";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const {
      newTitle,
      newAuthor,
      newDescription,
      newLink,
      newStatus,
      newSubject,
    } = await request.json();

    await connectMongoDB();

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        title: newTitle,
        author: newAuthor,
        description: newDescription,
        link: newLink,
        status: newStatus,
        subject: newSubject,
      },
      { new: true }
    );

    console.log("Book updated", updatedBook);

    return NextResponse.json(
      { message: "Book updated", book: updatedBook },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
