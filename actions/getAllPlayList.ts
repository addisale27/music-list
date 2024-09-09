import prisma from "@/libs/prismadb";
import { PlayList, Review, User } from "@prisma/client";

export interface IParams {
  searchTerm?: string | null;
}

export default async function getAllMusicLists(
  params: IParams
): Promise<(PlayList & { reviews: (Review & { user: User })[] })[]> {
  try {
    const { searchTerm } = params;
    // Ensure searchString is a string
    const searchString: string = searchTerm || "";

    const playLists = await prisma.playList.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchString,
              mode: "insensitive",
            },
          },
          {
            album: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
    });

    return playLists; // Return the result
  } catch (error) {
    console.error("Error while fetching playlists:", error); // Log the error
    throw error; // Re-throw the error for further handling
  }
}
