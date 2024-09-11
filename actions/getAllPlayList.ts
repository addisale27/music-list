import prisma from "@/libs/prismadb";
import { SafeUser } from "@/types";

import { PlayList, Review } from "@prisma/client";

// Define types for Reviews and Playlists
interface PlayLists {
  playList: PlayList & {
    review: Review[] & {
      user: SafeUser[];
    };
  };
}
export interface IParams {
  searchTerm?: string;
}

export default async function getAllMusicLists(
  params: IParams
): Promise<PlayLists[] | null> {
  try {
    const { searchTerm } = params;
    let searchString: string | undefined = searchTerm;
    if (!searchTerm) searchString = "";
    // const searchString: string | undefined = searchTerm ?? undefined;

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

    return playLists;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return null; // Return null in case of an error
  }
}
