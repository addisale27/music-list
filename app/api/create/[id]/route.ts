import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

interface IPrams {
  id: string;
}

export async function DELETE(request: Request, { params }: { params: IPrams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  const { id } = params;
  const playList = await prisma.playList.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(playList);
}
