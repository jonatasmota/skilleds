import connectMongoDB from "@/lib/mongodb";
import Idea from "@/models/ideas";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { userId } = auth();
    const { subject, title, imgUrl, textarea } = await req.json();

    if (!userId)
      return new NextResponse("User not authenticated", { status: 401 });

    await connectMongoDB();

    await Idea.create({
      userId,
      subject,
      title,
      imgUrl,
      textarea,
    });

    return NextResponse.json(
      { message: "Idea created successfully" },
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

    const ideas = await Idea.find({ userId });

    return NextResponse.json(ideas);
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error getting ideas", { status: 500 });
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
      newTextarea: textarea,
      newImgUrl: imgUrl,
      newSubject: subject,
    } = await request.json();

    await connectMongoDB();

    const updatedIdea = await Idea.findByIdAndUpdate(
      id,
      {
        title,
        textarea,
        imgUrl,
        subject,
      },
      { new: true }
    );

    console.log("Idea updated", updatedIdea); // Adicione este log

    return NextResponse.json(
      { message: "Idea updated", book: updatedIdea },
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

  await Idea.findByIdAndDelete({ _id: id, userId });

  return NextResponse.json({ message: "Idea deleted successfully" });
}
