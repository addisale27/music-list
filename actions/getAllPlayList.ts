import prisma from "@/libs/prismadb";
import { PlayList, Review, Role } from "@prisma/client";

// Define the type for SafeUser, assuming it includes the fields Prisma returns for the user
interface SafeUser {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  hashedPassword: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

// Extend the PlayList and Review types from Prisma to include the SafeUser type for reviews
interface ExtendedReview extends Review {
  user: SafeUser;
}

interface ExtendedPlayList extends PlayList {
  reviews: ExtendedReview[];
}

export interface IParams {
  searchTerm?: string;
}

export default async function getAllMusicLists(
  params: IParams
): Promise<ExtendedPlayList[] | null> {
  try {
    const { searchTerm } = params;
    const searchString: string = searchTerm ?? "";

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
            user: true, // Includes all fields related to the user
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
    });

    return playLists as ExtendedPlayList[];
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return null; // Return null in case of an error
  }
}
