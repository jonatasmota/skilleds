import connectMongoDB from "@/lib/mongodb";
import Idea from "@/models/ideas";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Sua rota GET
export async function GET(request, { params }) {
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

// // Sua rota PUT
// export async function PUT(request, { params }) {
//   try {
//     const { id } = params;
//     const { status: newStatus } = await request.json();
//     const { userId } = auth();

//     if (!userId)
//       return new NextResponse("User not authenticated", { status: 401 });

//     console.log("Updating status...", id, newStatus);

//     await connectMongoDB();

//     const updatedIdea = await Idea.findOneAndUpdate(
//       { _id: id, userId },
//       { status: newStatus },
//       { new: true }
//     );

//     if (!updatedIdea)
//       return new NextResponse("Idea not found or unauthorized", {
//         status: 404,
//       });

//     console.log("Idea updated", updatedIdea);

//     return NextResponse.json(
//       { message: "Status updated", Idea: updatedIdea },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating status:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
