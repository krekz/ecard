import { prisma } from "../../../../prisma";
import { NextResponse } from "next/server";

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
          id: "clvqhrobm0000eevasdpn4lnp",
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
          heirs: {
            select: {
              id:true,
              name: true,
              phone_number: true,
              relationship: true,
            },
          },
          event: {
            select: {
              id:true,
              venue: true,
              address: true,
              date: true,
              time: true,
              gMap: true,
              greeting: true,
            },
          },
          donation: {
            select: {
              id:true,
              name: true,
              bank: true,
              accountNo: true,
              qrCode: true,
            },
          },
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
