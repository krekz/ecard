"use server";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
// import { prisma } from "../prisma";
import prisma from "../prisma";
import { organizerSchema } from "../schema/zod/ecard-form";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const createCard = async (formData: FormData) => {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect("/login");
  }
  const validatedData = organizerSchema.safeParse(formData);
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
    };
  }
  try {
    // validate the choosen design and pass to the card
    const design = await prisma.design.findUnique({
      where: {
        designId: validatedData.data.designId,
      },
    });
    const plan = await prisma.plans.findUnique({
      where: {
        name: "basic",
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });
    if (!plan) throw new Error("Plan not exists");
    if (!design) throw new Error("Design not exists");
    const card = await prisma.eCard.create({
      data: {
        father: validatedData.data.father,
        mother: validatedData.data.mother,
        bride: validatedData.data.bride,
        userId: user?.id ?? "",
        groom: validatedData.data.groom,
        couple: validatedData.data.couple,
        phone_number: validatedData.data.phone_number,
        youtubeURL: validatedData.data.youtubeURL,
        designId: design?.designId,
        primary_font: validatedData.data.primary_font,
        secondary_font: validatedData.data.secondary_font,
        plan: plan.name,
        event: {
          create: {
            date: validatedData.data.event.date,
            start_time: validatedData.data.event.start_time,
            end_time: validatedData.data.event.end_time,
            venue: validatedData.data.event.venue,
            address: validatedData.data.event.address,
            greeting: validatedData.data.event.greeting,
            gMap: validatedData.data.event.gMap,
          },
        },
        donation: {
          create: {
            name: validatedData.data.donation.name,
            bank: validatedData.data.donation.bank,
            accountNo: validatedData.data.donation.accountNo,
            qrCode: validatedData.data.donation.qrcode,
          },
        },
        heirs: {
          create: validatedData.data.heirs?.map((heir) => ({
            name: heir.name,
            phone_number: heir.phone,
            relationship: heir.relation,
          })),
        },
      },
    });

    const { id } = card;
    // console.log(validatedData.data.heirs);
    // if (validatedData.data.heirs && validatedData.data.heirs.length > 0) {
    //   await prisma.heirs.createMany({
    //     data: validatedData.data.heirs.map((heir) => ({
    //       name: heir.name,
    //       phone_number: heir.phone,
    //       relationship: heir.relation,
    //       eCardId: id,
    //     })),
    //   });
    // }

    // get the auto generate ID in DB

    return { ok: true, id };
  } catch (error) {
    console.log(error);
  }
};

export const updateCard = async (
  formData: FormData,
  {
    cardId,
    eventId,
    donationId,
    heirsId,
  }: { cardId: string; eventId: number; donationId: number; heirsId: number[] }
) => {
  const session = await auth();
  if (!session) NextResponse.redirect("/index");
  const existingCard = await prisma.eCard.findUnique({
    where: {
      id: cardId,
    },
    select: {
      userId: true,
    },
  });

  if (!existingCard || existingCard.userId !== session?.user?.id) {
    throw new Error("Unauthorized access");
  }
  const validatedData = organizerSchema.safeParse(formData);
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  try {
    // validate the choosen design and pass to the card
    const design = await prisma.design.findUnique({
      where: {
        designId: validatedData.data.designId,
      },
    });
    const card = await prisma.eCard.update({
      where: {
        id: cardId, // Use the cardId parameter instead of a hardcoded value
      },
      data: {
        father: validatedData.data.father,
        mother: validatedData.data.mother,
        bride: validatedData.data.bride,
        groom: validatedData.data.groom,
        couple: validatedData.data.couple,
        phone_number: validatedData.data.phone_number,
        youtubeURL: validatedData.data.youtubeURL,
        designId: design?.designId,
        primary_font: validatedData.data.primary_font,
        secondary_font: validatedData.data.secondary_font,
        event: {
          update: {
            where: { id: eventId },
            data: {
              date: validatedData.data.event.date,
              start_time: validatedData.data.event.start_time,
              end_time: validatedData.data.event.end_time,
              venue: validatedData.data.event.venue,
              address: validatedData.data.event.address,
              greeting: validatedData.data.event.greeting,
              gMap: validatedData.data.event.gMap,
            },
          },
        },
        donation: {
          update: {
            // Changed from 'create' to 'update'
            where: { id: donationId }, // You need to provide a way to identify the donation
            data: {
              name: validatedData.data.donation.name,
              bank: validatedData.data.donation.bank,
              accountNo: validatedData.data.donation.accountNo,
              qrCode: validatedData.data.donation.qrcode,
            },
          },
        },
        heirs: {
          update: validatedData?.data?.heirs?.map((heir, index) => ({
            where: { id: heirsId[index] }, // Correctly map each heir to its corresponding ID
            data: {
              name: heir.name,
              phone_number: heir.phone,
              relationship: heir.relation,
            },
          })),
        },
      },
    });

    revalidatePath("/edit");
    return card;
  } catch (error) {
    console.log(error);
  }
};

// export const testSubmit = async (formData: FormData) => {
//   const data = Object.fromEntries(formData);
//   console.log(data);
//   try {
//     const cubaTest = await prisma.cubaTest.create({
//       data: {
//         test: data.test as string,
//         nais: data.nais as string,
//       },
//     });
//     return cubaTest;
//   } catch (error) {
//     console.log(error);
//   }
// };
