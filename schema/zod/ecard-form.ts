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
  google_map: z.string().url().optional().nullable().or(z.literal("")),
  greeting: z.string().min(1, { message: "Event greeting is required" }),
  program_name: z.array(z.string().optional()),
  program_time: z.array(z.string().optional()),
});

const donationSchema = z.object({
  acc_name: z
    .string()
    // .regex(stringRegex, { message: "Invalid format" })
    .optional()
    .nullable(),
  acc_number: z.string().optional().nullable(),
  bank: z
    .string()
    // .regex(stringRegex, { message: "Invalid format" })
    .optional()
    .nullable(),
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
    youtube_url: z
      .string()
      .url()
      .optional()
      .or(z.literal(""))
      .nullable()
      .refine(
        (url) => {
          return (
            !url || url.includes("youtube.com") || url.includes("youtu.be")
          );
        },
        { message: "URL must be from 'youtube' or 'youtu.be'" }
      ),
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
    wedding_images: z
      .array(z.custom<File>())
      .optional()
      .refine((files) => !files || files.length < 4, {
        message: "Must be less than 3 images",
      })
      .refine(
        (files) =>
          !files ||
          files.every(
            (file) =>
              file?.size <= 1024 * 1024 * 5 &&
              ["image/png", "image/jpeg", "image/jpg"].includes(file?.type)
          ),
        {
          message: "only .jpeg, .jpg, .png files of 5MB or less are accepted",
        }
      ),
  })
  .and(eventSchema)
  .and(donationSchema);

// voucher schema
export const voucherClaimSchema = z.object({
  voucher_code: z.string().optional(),
});
