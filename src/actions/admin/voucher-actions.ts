"use server";
import prisma from "../../../prisma";
import { auth } from "@/auth";
import { createVoucherFormSchema } from "../../../schema/zod/admin-form";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { voucherClaimSchema } from "../../../schema/zod/ecard-form";

export const checkVoucher = async (formData: FormData, userId: string) => {
  const values = Object.fromEntries(formData.entries());
  const { voucher_code } = voucherClaimSchema.parse(values);
  try {
    if (!userId) throw new Error("Unauthorized access");
    const [voucher, existingClaim] = await Promise.all([
      prisma.voucher.findUnique({
        where: {
          code: voucher_code,
        },
        select: {
          code: true,
          count_claims: true,
          max_claims: true,
          active: true,
        },
      }),
      prisma.userVoucher.findUnique({
        where: {
          userId_voucherId: {
            userId,
            voucherId: voucher_code!,
          },
        },
      }),
    ]);

    if (!voucher || !voucher.active || existingClaim) {
      return {
        ok: false,
        message: "Voucher either expired or doesn't exist",
      };
    }

    return {
      ok: true,
      message: "Voucher found",
      code: voucher.code,
    };
  } catch (error) {
    console.log(error);
  }
};

export const voucherClaim = async (formData: FormData, userId: string) => {
  const values = Object.fromEntries(formData.entries());
  const { voucher_code } = voucherClaimSchema.parse(values);
  try {
    if (!userId) throw new Error("Unauthorized access");

    //else create new record and update voucher count_claims
    const getVoucher = await prisma.voucher.findUnique({
      where: {
        code: voucher_code,
      },
      select: {
        max_claims: true,
        count_claims: true,
        active: true,
      },
    });

    await prisma.$transaction([
      prisma.userVoucher.create({
        data: {
          voucherId: voucher_code!,
          userId: userId,
        },
      }),
      prisma.voucher.update({
        where: {
          code: voucher_code,
        },
        data: {
          count_claims: {
            increment: 1,
          },
          active:
            (getVoucher?.count_claims ?? 0) + 1 >= (getVoucher?.max_claims ?? 0)
              ? false
              : undefined,
        },
      }),
    ]);

    return { ok: true, message: "Voucher claimed", voucher_id: voucher_code };
  } catch (error) {
    console.log(error);
  }
};

export const uploadVoucher = async (
  formData: z.infer<typeof createVoucherFormSchema>
) => {
  const { code, description, max_claims } =
    createVoucherFormSchema.parse(formData);
  try {
    const session = await auth();
    if (!session || session.user.role === "user") {
      throw new Error("Unauthorized access or insufficient permissions");
    }
    if (max_claims <= 0)
      return {
        message: "Quantity cannot be empty",
        ok: false,
      };

    const result = await prisma.$transaction(async (prisma) => {
      const existingVoucher = await prisma.voucher.findUnique({
        where: { code },
      });
      if (existingVoucher) {
        return { message: "Voucher code already exists", ok: false };
      }

      await prisma.voucher.create({
        data: { code, description, max_claims },
      });

      revalidatePath("/auth/admin/vouchers");
      return { message: "Voucher created successfully", ok: true };
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteVoucher = async (code: string) => {
  const session = await auth();
  if (!session) throw new Error("Unauthorized access");
  if (session.user.role === "user") {
    throw new Error("You have no right access");
  }
  try {
    // delete voucher
    await prisma.$transaction([
      prisma.voucher.delete({
        where: {
          code,
        },
      }),
      prisma.userVoucher.deleteMany({
        where: {
          voucherId: code,
        },
      }),
    ]);
    revalidatePath("/auth/admin/vouchers");
    return {
      message: "Voucher deleted successfully",
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "An error occurred",
      ok: false,
    };
  }
};
