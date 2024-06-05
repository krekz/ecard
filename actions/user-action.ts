"use server";
import { redirect } from "next/navigation";
import prisma from "../prisma";
import { completeResgistrationSchema } from "../schema/zod/user-form";

export const checkNewUser = async (userId: string | undefined) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user === null;
};

export const UpdateUser = async (
  userId: string | undefined,
  formData: FormData
) => {
  const values = Object.fromEntries(formData.entries());
  const { district, state, referral } =
    completeResgistrationSchema.parse(values);

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        state,
        district,
        referral,
      },
    });
  } catch (error) {
    console.log(error);
  }
  return {
    state,
    district,
  };
};
