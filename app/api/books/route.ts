import connectMongoDB from "@/lib/mongodb";
import Book from "@/models/books";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const { subject, title, author, description, link, status } =
    await req.json();

  await connectMongoDB();

  await Book.create({
    subject,
    title,
    author,
    description,
    link,
    status,
  });

  return NextResponse.json(
    { message: "Book created successfully" },
    { status: 201 }
  );
}

export async function GET(req: Request, res: Response) {
  await connectMongoDB();

  const books = await Book.find({});

  return NextResponse.json(books);
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;

    const {
      newTitle: title,
      newAuthor: author,
      newDescription: description,
      newLink: link,
      newStatus: status,
      newSubject: subject,
    } = await request.json();

    console.log("Updating book...", id, title, status);

    await connectMongoDB();

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        title,
        description,
        link,
        status,
        author,
        subject,
      },
      { new: true }
    );

    console.log("Book updated", updatedBook); // Adicione este log

    return NextResponse.json(
      { message: "Book updated", book: updatedBook },
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

  await connectMongoDB();

  await Book.findByIdAndDelete(id);

  return NextResponse.json({ message: "Book deleted successfully" });
}
