"use server";
import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { organizerSchema, voucherClaimSchema } from "../schema/zod/ecard-form";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient();

export const createCard = async (formData: FormData) => {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("You must logged in to create a card");
    }

    const values = Object.fromEntries(formData.entries());
    const {
      address,
      bride,
      couple,
      date,
      design_id,
      // end_time,
      // start_time,
      father,
      greeting,
      groom,
      mother,
      phone_number,
      primary_font,
      secondary_font,
      venue,
      acc_name,
      acc_number,
      bank,
      google_map,
      qrcode,
      youtube_url,
    } = organizerSchema.parse(values);

    // validate the choosen design and pass to the card
    const design = await prisma.design.findUnique({
      where: {
        designId: design_id,
      },
    });
    if (!design) throw new Error("Design not exists");

    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });
    if (!user) throw new Error("User not exists");

    const { data, error } = await supabase.storage
      .from("e-card bucket")
      .upload(
        `${user.id}/qrcode/qr-${uuidv4()}`,
        formData.get("qrcode") as File
      );
    if (data) {
      console.log(data);
    } else {
      console.log(error);
    }

    const donationData =
      acc_name || bank || acc_number || qrcode
        ? {
            create: {
              acc_name,
              bank,
              acc_number,
              qrCode: `${data?.path}`,
            },
          }
        : undefined;

    const card = await prisma.eCard.create({
      data: {
        father,
        mother,
        bride,
        userId: user?.id ?? "",
        groom,
        couple,
        phone_number,
        youtube_url: youtube_url,
        designId: design_id,
        primary_font,
        secondary_font,
        // plan: plan.name,
        event: {
          create: {
            date,
            start_time: "test_start",
            end_time: "test_end",
            venue,
            address,
            greeting,
            gMap: google_map,
          },
        },
        donation: donationData,
        // heirs: {
        //   create: validatedData.data.heirs?.map((heir) => ({
        //     name: heir.name,
        //     phone_number: heir.phone,
        //     relationship: heir.relation,
        //   })),
        // },
      },
    });

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
    const { id } = card;
    return { ok: true, id , message: "Card created"};
  } catch (error) {
    console.log(error);
  }
};

type TUpdateCard = {
  cardId: string;
  eventId: number;
  donationId: number | undefined;
  userId: string | undefined;
};

export const updateCard = async (
  formData: FormData,
  { cardId, eventId, donationId, userId }: TUpdateCard // heirsId,
) =>
  //heirsId: number[]
  {
    // TODO : existed qr code will delete if user update the card

    const values = Object.fromEntries(formData.entries());
    const {
      address,
      bride,
      couple,
      date,
      design_id,
      // end_time,
      // start_time,
      father,
      greeting,
      groom,
      mother,
      phone_number,
      primary_font,
      secondary_font,
      venue,
      acc_name,
      acc_number,
      bank,
      google_map,
      qrcode,
      youtube_url,
    } = organizerSchema.parse(values);

    try {
      const session = await auth();
      if (!session) throw new Error("Unauthorized access");
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

      // validate the choosen design and pass to the card
      const design = await prisma.design.findUnique({
        where: {
          designId: design_id,
        },
      });

      if (!design) {
        throw new Error("Design not found");
      }

      const promises = [];

      // update ecard
      const eCardUpdatePromise = prisma.eCard.update({
        where: {
          id: cardId,
        },
        data: {
          father,
          mother,
          bride,
          groom,
          couple,
          phone_number,
          youtube_url,
          designId: design.designId,
          primary_font,
          secondary_font,
        },
      });
      promises.push(eCardUpdatePromise);

      // pdate the event
      const eventUpdatePromise = prisma.event.update({
        where: {
          id: eventId,
        },
        data: {
          date,
          address,
          start_time: "start_time" || "",
          end_time: "end_time" || "",
          gMap: google_map,
          greeting,
          venue,
        },
      });
      promises.push(eventUpdatePromise);

      let getQr_url = undefined;
      if (!donationId) {
        // check if user submit qrcode
        if (qrcode) {
          const { data, error } = await supabase.storage
            .from("e-card bucket")
            .upload(`${userId}/qrcode/qr-${uuidv4()}`, qrcode as File);
          if (data) {
            console.log(data);
            getQr_url = data.path;
          } else {
            console.log(error);
          }
        }

        if (qrcode || acc_name || acc_number || bank) {
          const donationCreatePromise = prisma.donation.create({
            data: {
              eCardId: cardId,
              acc_name: acc_name || null,
              acc_number: acc_number || null,
              bank: bank || null,
              qrCode: getQr_url || null,
            },
          });
          promises.push(donationCreatePromise);
        }
      } else {
        const { data: list } = await supabase.storage
          .from("e-card bucket")
          .list(`${userId}/qrcode`);
        // Qr existed in DB?
        //Only allow 1 Qr
        if ((list?.length ?? 0) >= 1 && qrcode) {
          const removedFiles = list?.map(
            (img) => `${userId}/qrcode/${img.name}`
          );
          await supabase.storage
            .from("e-card bucket")
            .remove(removedFiles as string[]);
          const { data, error } = await supabase.storage
            .from("e-card bucket")
            .upload(`${userId}/qrcode/qr-${uuidv4()}`, qrcode as File);
          if (data) {
            getQr_url = data.path;
          } else {
            console.log(error);
          }
        } else {
          const { data, error } = await supabase.storage
            .from("e-card bucket")
            .upload(`${userId}/qrcode/qr-${uuidv4()}`, qrcode as File);
          if (data) {
            getQr_url = data.path;
          } else {
            console.log(error);
          }
        }

        const donationUpdatePromise = prisma.donation.update({
          where: {
            id: donationId,
          },
          data: {
            acc_name: acc_name || null,
            acc_number: acc_number || null,
            bank: bank || null,
            qrCode: getQr_url || null,
          },
        });
        promises.push(donationUpdatePromise);
      }

      await Promise.all(promises);
      return { ok: true, message: "Card updated" };

      revalidatePath(`/api/card/${cardId}`);
    } catch (error) {
      console.log(error);
    }
  };

export const voucherClaim = async (formData: FormData) => {
  const values = Object.fromEntries(formData.entries());
  const { voucher_code } = voucherClaimSchema.parse(values);
  console.log(voucher_code);

  try {
    const session = await auth();
    if (!session) throw new Error("Unauthorized access");

    const voucher = await prisma.voucher.findUnique({
      where: {
        code: voucher_code,
      },
      select: {
        code: true,
        count_claims: true,
        max_claims: true,
      },
    });

    if (!voucher) return { ok: false, message: "Voucher not found" };
    if(voucher.count_claims >= voucher.max_claims) return { ok: false, message: "Voucher either expired or already claimed" };

    const existingClaim = await prisma.userVoucher.findUnique({
      where: {
        userId_voucherId: {
          userId: session?.user?.id!,
          voucherId: voucher?.code!,
        },
      },
    });

    if (existingClaim) return { ok: false, message: "Voucher already claimed" };

    //else create new record and update voucher count_claims
    await prisma.$transaction([
      prisma.userVoucher.create({
        data: {
          voucherId: voucher?.code!,
          userId: session?.user?.id!,
        },
      }),
      prisma.voucher.update({
        where: {
          code: voucher?.code!,
        },
        data: {
          count_claims: {
            increment: 1,
          },
        },
      }),
    ]);

    return { ok: true, message: "Voucher claimed" };
  } catch (error) {
    console.log(error);
  }
};
