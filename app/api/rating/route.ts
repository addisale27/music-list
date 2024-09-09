// Example server-side code for handling the /api/rating POST request
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { playListId, userId, comment, rating } = data;

    if (!playListId || !userId || !rating || !comment) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newReview = await prisma.review.create({
      data: {
        playListId,
        userId,
        comment,
        rating: Number(rating), // Ensure rating is a number
      },
    });

    return NextResponse.json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.error();
  }
}
