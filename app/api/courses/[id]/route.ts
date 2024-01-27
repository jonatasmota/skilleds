import connectMongoDB from "@/lib/mongodb";
import Course from "@/models/courses";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { userId } = auth();
    const { id } = params;

    const {
      newTitle: title,
      newDescription: description,
      newLink: link,
      newStatus: status,
    } = await request.json();

    if (!userId)
      return new NextResponse("User not authenticated", { status: 401 });

    await connectMongoDB();

    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: id, userId },
      { title, description, link, status },
      { new: true }
    );

    return NextResponse.json({ message: "Course updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error updating course", { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    const { userId } = auth();
    const { id } = params;

    if (!userId)
      return new NextResponse("User not authenticated", { status: 401 });

    await connectMongoDB();

    const course = await Course.findOne({ _id: id, userId });

    if (!course) return new NextResponse("Course not found", { status: 404 });

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error getting course", { status: 500 });
  }
}
