// import { prisma } from "../../../../prisma";
import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";
import { NextResponse } from "next/server";

const prisma = new PrismaClient().$extends({
  result: {
    event: {
      dateShort: {
        needs: {date:true},
        compute({date}){
          return format(date,"dd/L/y")
        }
      }
    }
  },
})

export async function GET(req: Request) {
  const response = NextResponse.next();
  // Set headers to disable caching
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');

  if (req.method === "GET") {
    try {
      const data = await prisma.eCard.findUnique({
        where: {
          id: "clvszabdq00071451ep3y32k1",
        },
        select: {
          id:true,
          father: true,
          mother: true,
          bride: true,
          groom: true,
          couple: true,
          phone_number: true,
          youtubeURL: true,
          designId: true,
          primary_font: true,
          secondary_font: true,
          plan:true,
          images: true,
          heirs:true,
          event:true,
          donation: true,
        },
      }); // Corrected from 'card' to 'eCard' based on lint context
      return NextResponse.json(data);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log(1);
  }
}
