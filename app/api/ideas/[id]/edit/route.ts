// Importações necessárias

import connectMongoDB from "@/lib/mongodb";
import Idea from "@/models/ideas";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = params;

    const { newTitle, newTextarea, newImgUrl, newSubject } =
      await request.json();

    await connectMongoDB();

    const updatedIdea = await Idea.findByIdAndUpdate(
      id,
      {
        title: newTitle,
        textarea: newTextarea,
        imgUrl: newImgUrl,
        subject: newSubject,
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Idea updated", idea: updatedIdea },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating idea:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
