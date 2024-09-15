import prisma from "@/libs/prismadb";
import { SafeUser } from "@/types";
import { Review as PrismaReview } from "@prisma/client";

interface PlayListWithReviews {
  id: string;
  title: string;
  album: string;
  genre: string;
  artist: string;
  releasedYear: string;
  description: string;
  images: string[];
  userId: string; // Ensure this field is included
  reviews: (PrismaReview & {
    user: SafeUser;
  })[];
}

export async function getPlayListById(
  id: string
): Promise<PlayListWithReviews | null> {
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

    return {
      id: playList.id,
      title: playList.title,
      album: playList.album,
      genre: playList.genre,
      artist: playList.artist,
      releasedYear: playList.releasedYear,
      description: playList.description,
      images: playList.images,
      userId: playList.userId, // Ensure this is included
      reviews: playList.reviews.map((review) => ({
        id: review.id,
        userId: review.userId,
        playListId: review.playListId,
        rating: review.rating,
        comment: review.comment || "", // Handle null values
        createdDate: review.createdDate,
        user: {
          id: review.user.id,
          name: review.user.name || "", // Handle null values
          email: review.user.email || "",
          image: review.user.image || "",
          hashedPassword: review.user.hashedPassword || null,
          role: review.user.role,
          createdAt: review.user.createdAt.toISOString(),
          updatedAt: review.user.updatedAt.toISOString(),
          emailVerified: review.user.emailVerified?.toISOString() || null,
        },
      })),
    };
  } catch (error) {
    console.error("Error fetching playlist:", error);
    return null;
  }
}
