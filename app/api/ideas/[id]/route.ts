import connectMongoDB from "@/lib/mongodb";
import Idea from "@/models/ideas";
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

    const idea = await Idea.findOne({ _id: id, userId });

    if (!idea) return new NextResponse("Idea not found", { status: 404 });

    return NextResponse.json({ idea }, { status: 200 });
  } catch (error) {
    console.error("Error getting idea:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
