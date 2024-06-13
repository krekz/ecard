"use server";
import prisma from "../../prisma";
import { organizerSchema } from "../../schema/zod/ecard-form";
import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { get } from "http";
import { v4 as uuidv4 } from "uuid";

export const createCard = async (formData: FormData, userId: string) => {
  const supabase = createClient();

  try {
    if (!userId) {
      throw new Error("You must be logged in to create a card.");
    }

    const values: Record<string, any> = Object.fromEntries(formData.entries());

    // Accumulate specific keys into arrays
    ["wedding_images", "program_name", "program_time"].forEach((key) => {
      if (formData.getAll(key).length >= 1) {
        values[key] = formData.getAll(key);
      }
    });

    const {
      address,
      bride,
      couple,
      date,
      design_id,
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
      wedding_images,
      program_name,
      program_time,
    } = organizerSchema.parse(values);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new Error("User not exists");

    const design = await prisma.design.findUnique({
      where: {
        designId: design_id,
      },
    });
    if (!design) return { ok: false, message: "Design not exists" };

    const card = await prisma.eCard.create({
      data: {
        father,
        mother,
        bride,
        userId: user.id,
        groom,
        couple,
        phone_number,
        youtube_url,
        designId: design_id,
        primary_font,
        secondary_font,
        event: {
          create: {
            date,
            venue,
            address,
            greeting,
            program: {
              create: program_name.map((name, index) => ({
                name: name === "" || name === "undefined" ? null : name,
                start_time:
                  program_time[index] === "" ||
                  program_time[index] === "undefined"
                    ? null
                    : program_time[index],
              })),
              // .filter((program) => program.name !== ""), // filter entries with empty names
            },
            gMap: google_map,
          },
        },
        donation:
          acc_name || acc_number || bank || qrcode
            ? {
                create: {
                  acc_name: acc_name || null,
                  bank: bank || null,
                  acc_number: acc_number || null,
                  qrCode: "",
                },
              }
            : undefined,
      },
      include: {
        donation: true, // Include the donation relation in the result
      },
    });

    let qrCodePath = "";
    if (qrcode) {
      const qrPath = `users/user-${user.id}/card-${
        card.id
      }/qrcode/qr-${uuidv4()}`;
      const { data, error } = await supabase.storage
        .from(process.env.BUCKET_NAME!)
        .upload(qrPath, qrcode as File);
      if (error) {
        console.error(error);
      } else {
        qrCodePath = data.path;
        // Ensure donation record exists before updating
        if (!card.donation) {
          await prisma.donation.create({
            data: {
              eCardId: card.id,
              qrCode: qrCodePath,
              acc_name: null,
              bank: null,
              acc_number: null,
            },
          });
        } else {
          await prisma.donation.update({
            where: { eCardId: card.id },
            data: { qrCode: qrCodePath },
          });
        }
      }
    }

    const imageUrls: string[] = [];
    if (wedding_images) {
      const uploadPromises = wedding_images.map((image) => {
        const imagePath = `users/user-${user.id}/card-${
          card.id
        }/gallery/img-${uuidv4()}`;
        return supabase.storage
          .from(process.env.BUCKET_NAME!)
          .upload(imagePath, image)
          .then(({ data, error }) => {
            if (data) {
              imageUrls.push(data.path);
            } else {
              console.error(error);
            }
          });
      });

      await Promise.all(uploadPromises);

      if (imageUrls.length > 0) {
        await prisma.eCard.update({
          where: { id: card.id },
          data: {
            images: {
              create: imageUrls.map((url) => ({ url })),
            },
          },
        });
      }
    }

    return { ok: true, id: card.id, message: "Card created" };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "An error occurred." };
  }
};

type TUpdateCard = {
  cardId: string | undefined;
  eventId: number | undefined;
  donationId: number | undefined;
  userId: string | undefined;
};

export const updateCard = async (
  formData: FormData,
  { cardId, eventId, donationId, userId }: TUpdateCard // heirsId,
) =>
  //heirsId: number[]
  {
    const values: Record<string, any> = Object.fromEntries(formData.entries());
    ["wedding_images", "program_name", "program_time"].forEach((key) => {
      if (formData.getAll(key).length >= 1) {
        values[key] = formData.getAll(key);
      }
    });
    const {
      address,
      bride,
      couple,
      date,
      design_id,
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
      wedding_images,
      program_name,
      program_time,
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
          donation: {
            select: {
              qrCode: true,
            },
          },
          event: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!existingCard || existingCard.userId !== session?.user?.id)
        throw new Error("Unauthorized access");

      // validate the choosen design and pass to the card
      const design = await prisma.design.findUnique({
        where: {
          designId: design_id,
        },
      });

      if (!design) return { ok: false, message: "Design not found" };

      const existingImages = await prisma.eCard.findUnique({
        where: { id: cardId },
        select: { images: true },
      });

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

      const existingProgram = await prisma.event.findUnique({
        where: {
          id: existingCard?.event?.id,
        },
        select: {
          program: {
            select: {
              id: true,
            },
          },
        },
      });

      const eventUpdatePromise = prisma.event.update({
        where: {
          id: eventId,
        },
        data: {
          date,
          address,
          gMap: google_map,
          greeting,
          venue,
          program: {
            update: program_name.map((name, index) => ({
              where: {
                id: existingProgram!.program[index]?.id,
              },
              data: {
                name: name === "" || name === "undefined" ? null : name,
                start_time:
                  program_time[index] === "" ||
                  program_time[index] === "undefined"
                    ? null
                    : program_time[index],
              },
            })),
          },
        },
      });
      promises.push(eventUpdatePromise);

      let getQr_url: string | undefined = undefined;
      let getGallery_url: undefined | string[] = undefined;

      const uploadQrCode = async (qrcode: File, userId: string) => {
        const supabase = createClient();

        const { data, error } = await supabase.storage
          .from(process.env.BUCKET_NAME!)
          .upload(
            `users/user-${userId}/card-${cardId}/qrcode/qr-${uuidv4()}`,
            qrcode
          );
        if (error) {
          console.error(error);
          throw new Error("Failed to upload QR code");
        }
        return data?.path;
      };

      const uploadGallery = async (
        gallery: File[],
        userId: string,
        cardId: string
      ): Promise<string[]> => {
        const supabase = createClient();
        const uploadPromises = gallery.map(async (image) => {
          const { data, error } = await supabase.storage
            .from(process.env.BUCKET_NAME!)
            .upload(
              `users/user-${userId}/card-${cardId}/gallery/img-${uuidv4()}`,
              image
            );
          if (error) {
            console.error(error);
            throw new Error("Failed to upload gallery image");
          }
          return data?.path;
        });
        const paths = await Promise.all(uploadPromises);
        return paths.filter((path): path is string => !!path);
      };

      const handleDonationCreation = async () => {
        if (qrcode) {
          getQr_url = await uploadQrCode(qrcode as File, userId!);
        }

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
      };

      const handleDonationUpdate = async () => {
        const supabase = createClient();

        if (qrcode) {
          const { data: list } = await supabase.storage
            .from(process.env.BUCKET_NAME!)
            .list(`users/user-${userId}/card-${cardId}/qrcode`);

          // Check existing donation and user want to replace with new one
          if (list && list.length >= 1 && qrcode) {
            const removedFiles = list.map(
              (img) =>
                `users/user-${userId}/card-${cardId}/qrcode/qr-${img.name}`
            );
            await supabase.storage
              .from(process.env.BUCKET_NAME!)
              .remove(removedFiles);
          }
          getQr_url = await uploadQrCode(qrcode as File, userId!);
        } else {
          getQr_url = existingCard.donation?.qrCode || undefined;
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
      };

      const handleGalleryCreation = async () => {
        getGallery_url = await uploadGallery(wedding_images!, userId!, cardId!);
        const uploadGalleryPromise = prisma.eCard.update({
          where: {
            id: cardId,
          },
          data: {
            images: {
              create: getGallery_url?.map((url) => ({
                url,
              })),
            },
          },
        });
        promises.push(uploadGalleryPromise);
      };

      const handleGalleryUpdate = async () => {
        const supabase = createClient();

        // Remove existing images
        const { data: list } = await supabase.storage
          .from(process.env.BUCKET_NAME!)
          .list(`users/user-${userId}/card-${cardId}/gallery`);

        if (list && list.length >= 1 && wedding_images) {
          const removedFiles = list.map(
            (img) => `users/user-${userId}/card-${cardId}/gallery/${img.name}`
          );
          await supabase.storage
            .from(process.env.BUCKET_NAME!)
            .remove(removedFiles);
        }

        getGallery_url = await uploadGallery(wedding_images!, userId!, cardId!);
        const updateGalleryPromise = await prisma.$transaction(
          async (prisma) => {
            await prisma.eCard.update({
              where: { id: cardId },
              data: {
                images: {
                  deleteMany: {},
                },
              },
            });

            await prisma.eCard.update({
              where: { id: cardId },
              data: {
                images: {
                  create: getGallery_url?.map((url) => ({
                    url,
                  })),
                },
              },
            });
          }
        );
        promises.push(updateGalleryPromise);
      };

      // Try Catch block that perform image upload
      try {
        if (!donationId && (qrcode || acc_name || acc_number || bank)) {
          await handleDonationCreation();
        } else if (donationId && (qrcode || acc_name || acc_number || bank)) {
          await handleDonationUpdate();
        }

        if (
          existingImages?.images.length &&
          existingImages?.images.length > 0 &&
          wedding_images // received new input
        ) {
          await handleGalleryUpdate();
        } else if (wedding_images && existingImages?.images.length === 0) {
          await handleGalleryCreation();
        }
      } catch (error) {
        console.error(error);
      }

      await Promise.all(promises);
      return { ok: true, message: "Card updated" };
    } catch (error) {
      console.log(error);
    }
  };

export const GetCardDetail = async (cardId: string) => {
  try {
    const getCard = await prisma.eCard.findUnique({
      where: {
        id: cardId,
      },
      include: {
        heirs: true,
        donation: true,
        event: {
          include: {
            program: true,
          },
        },
        images: {
          select: {
            url: true,
          },
        },
        Design: true,
        Program: true,
      },
    });
    if (!getCard) {
      return { ok: false, message: "Card not found" };
    }
    return { ok: true, data: getCard };
  } catch (error) {
    console.log(error);
  }
};

export const GetCards = async (userId: string | undefined) => {
  try {
    const cards = await prisma.eCard.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        updatedAt: true,
        couple: true,
        event: {
          select: {
            date: true,
          },
        },
        designId: true,
        invoice_url:true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return cards;
  } catch (error) {
    console.log(error);
  }
};
