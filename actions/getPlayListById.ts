
import prisma from "@/libs/prismadb";
export async function getPlayListById(id: string) {
  try {
    const playList = await prisma.playList.findUnique({
      where: {
        id: id,
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
        },
      },
    });
    if (!playList) return null;
    return playList;
  } catch (error) {
    return null;
  }
}
