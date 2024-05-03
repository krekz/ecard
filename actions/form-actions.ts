"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { organizerSchema } from "../schema/zod/ecard-form";

export const createCard = async (formData: FormData) => {
  const validatedData = organizerSchema.safeParse(formData);
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
    };
  }
  try {
    const card = await prisma.eCard.create({
      data: {
        father: validatedData.data.father,
        mother: validatedData.data.mother,
        bride: validatedData.data.bride,
        groom: validatedData.data.groom,
        couple: validatedData.data.couple,
        phone_number: validatedData.data.phone_number,
        youtubeURL: validatedData.data.youtubeURL,
        event: {
          create: {
            date: validatedData.data.event.date,
            time: validatedData.data.event.time,
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

    return card;
  } catch (error) {
    console.log(error);
  }
};

export const updateCard = async (formData: FormData, {cardId,eventId,donationId,heirsId}: {cardId: string, eventId: number, donationId: number, heirsId: number[]}) => {
  const validatedData = organizerSchema.safeParse(formData);
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  try {
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
        event: {
          update: {
            // Changed from 'create' to 'update'
            where: { id: eventId }, // You need to provide a way to identify the event
            data: {
              date: validatedData.data.event.date,
              time: validatedData.data.event.time,
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
          update: validatedData?.data?.heirs?.map((heir,index) => ({
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
