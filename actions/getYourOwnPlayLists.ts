import prisma from "@/libs/prismadb";
export async function getYourOwnPlayList(id: string) {
  try {
    const yourPlayList = await prisma.playList.findMany({
      where: {
        userId: id,
      },
    });
    if (!yourPlayList) return null;
    return yourPlayList;
  } catch (error) {
    throw error;
  }
}
