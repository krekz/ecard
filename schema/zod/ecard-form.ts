import { z } from "zod";

const numberRegex = /^[0-9]+$/;
const stringRegex = /^[a-zA-Z &]+$/;
const numberFormat = z
  .string()
  .min(10, { message: "Length too short !" })
  .max(13, { message: "You already exceed the limit of numbers" })
  .regex(numberRegex, { message: "Invalid format" });

// SCHEMASSS

export const organizerSchema = z.object({
  father: z
    .string()
    .min(1, "Father's name is required")
    .regex(stringRegex, { message: "Invalid format" }),
  mother: z
    .string()
    .min(1, "Mother's name is required")
    .regex(stringRegex, { message: "Invalid format" }),
  bride: z
    .string()
    .min(1, "Bride's name is required")
    .regex(stringRegex, { message: "Invalid format" }),
  groom: z
    .string()
    .min(1, "Groom's name is required")
    .regex(stringRegex, { message: "Invalid format" }),
  couple: z
    .string()
    .min(1, "Couple's name is required")
    .regex(stringRegex, { message: "Invalid format" })
    .refine((val) => val.includes("&"), { message: "Missing '&' character" }),
  phone_number: numberFormat, // phone cannot contain - or + or space
  designId: z.string().min(1, { message: "Design is required" }),
  youtubeURL: z.string().url().optional(),
  primary_font: z.string().min(1, "Font is required"),
  secondary_font: z.string().min(1, "Font is required"),
  // images: z.array(
  //   z.object({
  //     url: z.string().optional(),
  //   })
  // ),

  //waris
  heirs: z
    .array(
      z.object({
        name: z.string().optional(),
        phone: z.string().optional(),
        relation: z.string().optional(),
      })
    )
    .optional()
    .default([]),

  // EVENTS
  event: z.object({
    //   name: z.string().min(1, { message: "Event name is required" }),
    date: z.date({ required_error: "Date is required" }),
    time: z.string().min(1, { message: "Event time is required" }),
    venue: z.string().min(1, { message: "Event venue is required" }),
    address: z.string().min(1, { message: "Event address is required" }),
    gMap: z.string().url().optional(),
    //   waze: z.string().optional(),
    greeting: z.string().min(1, { message: "Event greeting is required" }),
  }),

  //DONATIONS
  donation: z.object({
    name: z
      .string()
      // .regex(stringRegex, { message: "Invalid format" })
      .optional(),
    bank: z
      .string()
      // .regex(stringRegex, { message: "Invalid format" })
      .optional(),
    accountNo: z.string().optional(),
    qrcode: z.any().optional(),
  }),
});
