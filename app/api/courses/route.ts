import connectMongoDB from "@/lib/mongodb";
import Course from "@/models/courses";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { userId } = auth();
    const { title, description, link, status } = await req.json();

    if (!userId)
      return new NextResponse("User not authenticated", { status: 401 });

    await connectMongoDB();

    await Course.create({
      userId,
      title,
      description,
      link,
      status,
    });

    return NextResponse.json(
      { message: "Course created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error creating course", { status: 500 });
  }
}

export async function GET(req: Request, res: Response) {
  try {
    const { userId } = auth();

    if (!userId)
      return new NextResponse("User not authenticated", { status: 401 });

    await connectMongoDB();

    const courses = await Course.find({ userId });

    return NextResponse.json(courses);
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error getting courses", { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const { userId } = auth();

  await connectMongoDB();

  await Course.findByIdAndDelete({ _id: id, userId });

  return NextResponse.json({ message: "Course deleted successfully" });
}
