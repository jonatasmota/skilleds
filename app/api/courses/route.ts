import connectMongoDB from "@/lib/mongodb";
import Course from "@/models/courses";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const { title, description, link, status } = await req.json();

  await connectMongoDB();

  await Course.create({
    title,
    description,
    link,
    status,
  });

  return NextResponse.json(
    { message: "Course created successfully" },
    { status: 201 }
  );
}

export async function GET(req: Request, res: Response) {
  await connectMongoDB();

  const courses = await Course.find({});

  return NextResponse.json(courses);
}

export async function DELETE(request: {
  nextUrl: { searchParams: { get: (arg0: string) => any } };
}) {
  const id = request.nextUrl.searchParams.get("id");

  await connectMongoDB();

  await Course.findByIdAndDelete(id);

  return NextResponse.json({ message: "Course deleted successfully" });
}
