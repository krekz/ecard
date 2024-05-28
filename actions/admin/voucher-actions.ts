"use server";
import prisma from "../../prisma";
import { auth } from "@/auth";
import { createVoucherFormSchema } from "../../schema/zod/admin-form";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const uploadVoucher = async (
  formData: z.infer<typeof createVoucherFormSchema>
) => {
  const { code, description, max_claims } =
    createVoucherFormSchema.parse(formData);
  try {
    const session = await auth();
    if (!session) throw new Error("Unauthorized access");
    if (session.user.role === "user") {
      throw new Error("You have no right access");
    }
    if (max_claims <= 0)
      return {
        message: "Quantity cannot be empty",
        ok: false,
      };

    const existingVoucher = await prisma.voucher.findUnique({
      where: {
        code,
      },
    });

    if (existingVoucher) {
      return {
        message: "Voucher code already exists",
        ok: false,
      };
    }

    await prisma.voucher.create({
      data: {
        code,
        description,
        max_claims,
      },
    });
    revalidatePath("/auth/admin/vouchers");
    return {
      message: "Voucher created successfully",
      ok: true,
    };
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
    await prisma.voucher.delete({
      where: {
        code,
      },
    });
    //delete user that claimed the voucher
    await prisma.userVoucher.deleteMany({
      where: {
        voucherId: code,
      },
    });
    revalidatePath("/auth/admin/vouchers");
    return {
      message: "Voucher deleted successfully",
      ok: true,
    };
  } catch (error) {
    console.log(error);
  }
};
