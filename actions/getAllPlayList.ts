import prisma from "@/libs/prismadb";

export interface IParams {
  searchTerm?: string | null;
}

export default async function getAllMusicLists(params: IParams) {
  try {
    const { searchTerm } = params;
    // Provide a default empty string if searchTerm is null or undefined
    const searchString: string | undefined = searchTerm ?? undefined;

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
    console.error("Error fetching playlists...:", error); // Log the error
  }
}
