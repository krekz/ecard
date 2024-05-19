import { format } from "date-fns";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

const prisma = new PrismaClient().$extends({
  result: {
    event: {
      dateShort: {
        needs: { date: true },
        compute({ date }) {
          return format(date, "dd/L/y");
        },
      },
    },
  },
});

export async function GET(
  req: Request,
  { params }: { params: { card_id: string } }
) {
  try {
    const validateCard = await prisma.eCard.findUnique({
      where: {
        id: params.card_id,
      },
    });
    if (!validateCard || !validateCard.userId) {
      return NextResponse.json(
        {
          error: "Card or User ID not found",
        },
        { status: 404 }
      );
    }

    // const cardDetail = await prisma.user.findUnique({
    //   where: {
    //     id: validateCard.userId,
    //   },
    //   include: {
    //     cards: true,
    //   },
    // });

    const cardDetail = await prisma.eCard.findUnique({
      where: {
        id: params.card_id,
      },
      include: {
        heirs: true,
        donation: true,
        event: true,
        images: true,
        Design: true,
      },
    });
    return NextResponse.json(cardDetail);
  } catch (error) {
    return NextResponse.json(
      {
        error: "An error occured while fetching the card",
      },
      { status: 500 }
    );
  }
}
