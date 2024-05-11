import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function GET(
  req: Request,
  { params }: { params: { user_id: string } }
) {
  const userId = params.user_id;

  if (!userId) {
    return new NextResponse("User ID is required", { status: 400 });
  }

  const findUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    return new NextResponse("User not found", { status: 404 });
  }

  const getUserCards = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      cards: {
        select: {
          id: true,
          userId: true,
          couple: true,
        },
      },
    },
  });

  return NextResponse.json(getUserCards);
}
