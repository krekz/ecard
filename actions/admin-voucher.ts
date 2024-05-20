"use server";
import prisma from "../prisma";
import { auth } from "@/auth";
import { createVoucherFormSchema } from "../schema/zod/admin-form";
import { z } from "zod";

export const uploadVoucher = async (
  formData: z.infer<typeof createVoucherFormSchema>
) => {
  try {
    const session = await auth();

    if (!session) throw new Error("You are not authorized to create a voucher");

    const { code, description, amount } =
      createVoucherFormSchema.parse(formData);
    await prisma.voucher.create({
      data: {
        code,
        description,
        amount,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
