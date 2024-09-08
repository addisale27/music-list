import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { title, artist, album, genre, releasedYear, description, images } =
    body;

  const listData = {
    user: { connect: { id: currentUser.id } },
    title,
    artist,
    album,
    genre,
    description,
    releasedYear,
    images,
    likes: 0,
  };

  try {
    const playList = await prisma.playList.create({ data: listData });
    return NextResponse.json(playList);
  } catch (error) {
    console.error("Error creating playlist:", error);
    return NextResponse.json(
      { error: "Unable to create playlist" },
      { status: 500 }
    );
  }
}
