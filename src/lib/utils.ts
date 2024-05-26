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

export const checkDate = (date: Date | null | undefined) => {
  return new Date() >= new Date(date as Date);
};
