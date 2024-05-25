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
  try {
    const userWithCards = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true, // Assuming you want to return the name, adjust fields as necessary
        cards: {
          select: {
            id: true,
            userId: true,
            couple: true,
            updatedAt:true,
            Design: {
              select: {
                designId: true,
                front_design_url: true,
              },
            },
            //  TODO : status:true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!userWithCards) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(userWithCards);
  } catch (error) {
    console.error("Database access error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
