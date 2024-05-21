import { z } from "zod";

const numberRegex = /^[0-9]+$/;
const stringRegex = /^[a-zA-Z &]+$/;
const numberFormat = z
  .string()
  .min(10, { message: "Length too short !" })
  .max(13, { message: "You already exceed the limit of numbers" })
  .regex(numberRegex, { message: "Invalid format" });

// SCHEMASSS

const eventSchema = z.object({
  date: z.coerce.date().transform((dateString, ctx) => {
    const date = new Date(dateString);
    if (!z.date().safeParse(date).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
      });
    }
    return date;
  }),
  // start_time: z.string(),
  // end_time: z.string(),
  venue: z.string().min(1, { message: "Event venue is required" }),
  address: z.string().min(1, { message: "Event address is required" }),
  google_map: z.string().url().optional().or(z.literal("")),
  greeting: z.string().min(1, { message: "Event greeting is required" }),
});

const donationSchema = z.object({
  acc_name: z
    .string()
    // .regex(stringRegex, { message: "Invalid format" })
    .optional(),
  acc_number: z.string().optional(),
  bank: z
    .string()
    // .regex(stringRegex, { message: "Invalid format" })
    .optional(),
});

export const organizerSchema = z
  .object({
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
    design_id: z.string().min(1, { message: "Design is required" }),
    youtube_url: z.string().url().optional().or(z.literal("")),
    primary_font: z.string().min(1, "Font is required"),
    secondary_font: z.string().min(1, "Font is required"),
    qrcode: z
      .custom<File | undefined>()
      .refine(
        (file) =>
          !file || (file instanceof File && file.type.startsWith("image/")),
        "Must be an image file"
      )
      .refine((file) => {
        return !file || file.size < 1024 * 1024 * 2;
      }, "File must be less than 2MB"),
  })
  .and(eventSchema)
  .and(donationSchema);

//  //waris
//  heirs: z
//  .array(
//    z.object({
//      name: z.string().optional(),
//      phone: z.string().optional(),
//      relation: z.string().optional(),
//    })
//  )
//  .optional(),

export const voucherClaimSchema = z.object({
  voucher_code: z.string().optional(),
});
