"use server";
import prisma from "../../prisma";
import { auth } from "@/auth";
import { createVoucherFormSchema } from "../../schema/zod/admin-form";
import { z } from "zod";

export const uploadVoucher = async (
  formData: z.infer<typeof createVoucherFormSchema>
) => {
  const { code, description, max_claims } =
    createVoucherFormSchema.parse(formData);
  try {
    const session = await auth();
    // TODO: check if user is admin
    if (!session) throw new Error("You are not authorized to create a voucher");

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

    return {
      message: "Voucher created successfully",
      ok: true,
    };
  } catch (error) {
    console.log(error);
  }
};
