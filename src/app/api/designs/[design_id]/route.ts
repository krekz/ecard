import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function GET(
  req: Request,
  { params }: { params: { design_id: string } }
) {
  try {
    const getDesign = await prisma.design.findUnique({
      where: {
        designId: params.design_id as string,
      },
      select: {
        designId: true,
        front_design_url: true,
      },
    });
    if (!getDesign || !getDesign.front_design_url) {
      return NextResponse.json(
        {
          error: "Card or User ID not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(getDesign);
  } catch (error) {
    return NextResponse.json(
      {
        error: "An error occured while fetching the card",
      },
      { status: 500 }
    );
  }
}
