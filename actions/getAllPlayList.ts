import prisma from "@/libs/prismadb";
import { PlayList, Review, User } from "@prisma/client"; // Import the necessary types

export interface IParams {
  searchTerm?: string | null;
}

export default async function getAllMusicLists(
  params: IParams
): Promise<(PlayList & { reviews: (Review & { user: User })[] })[]> {
  try {
    const { searchTerm } = params;
    let searchString = searchTerm ?? ""; // Default to an empty string if searchTerm is undefined or null

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
    console.error("Error fetching playlists:", error); // Log the error
    throw error; // Re-throw the error for further handling
  }
}
