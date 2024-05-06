import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {  primaryFontsConst , secondaryFontsConst } from "./constant"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFont(id: string) {
  return primaryFontsConst.find((font) => font.id === id) || secondaryFontsConst.find((font) => font.id === id)
}

