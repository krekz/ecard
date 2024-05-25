import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { primaryFontsConst, secondaryFontsConst } from "./constant";
import prisma from "../../prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFont(id: string | undefined) {
  return (
    primaryFontsConst.find((font) => font.id === id) ||
    secondaryFontsConst.find((font) => font.id === id)
  );
}

export const getAllDesigns = async () => {
  const cards = await prisma.design.findMany({
    select: {
      designId: true,
      category: true,
      name: true,
      thumbnail_url: true,
      front_design_url: true,
    },
  });

  return cards;
};

export const checkDate = (date: Date | null | undefined) => {
  return new Date() >= new Date(date as Date);
};
