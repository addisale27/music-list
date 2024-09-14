import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";
import { SafeUser } from "@/types"; // Ensure correct import path

export async function getSession() {
  return await getServerSession();
}

export async function getCurrentUser(): Promise<SafeUser | null> {
  try {
    const session = await getSession();
    if (!session?.user?.email) return null;

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) return null;

    // Ensure to map the Prisma user to SafeUser
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    // Optionally, log the error
    console.error("Error fetching current user:", error);
    return null;
  }
}
