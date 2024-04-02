import connectMongoDB from "@/lib/mongodb";
import Book from "@/models/books";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { userId } = auth();
    const { subject, title, author, description, link, status } =
      await req.json();

    if (!userId)
      return new NextResponse("User not authenticated", { status: 401 });

    await connectMongoDB();

    await Book.create({
      userId,
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
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error creating book", { status: 500 });
  }
}

export async function GET(req: Request, res: Response) {
  try {
    const { userId } = auth();

    if (!userId)
      return new NextResponse("User not authenticated", { status: 401 });

    await connectMongoDB();

    const books = await Book.find({ userId });

    return NextResponse.json(books);
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error getting books", { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { userId } = auth();

    if (!userId)
      return new NextResponse("User not authenticated", { status: 401 });

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

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const { userId } = auth();

  await connectMongoDB();

  await Book.findByIdAndDelete({ _id: id, userId });

  return NextResponse.json({ message: "Book deleted successfully" });
}
