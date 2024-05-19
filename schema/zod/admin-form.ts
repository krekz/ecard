import { z } from "zod";

const fileFormat = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file"
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

export const createDesignFormSchema = z.object({
  design_name: z
    .string()
    .min(2, "Design name is required")
    .transform((str) => str.replace(/\s+/g, "")),
  category: z.string().min(2, "Category is required"),
  thumbnail : fileFormat,
  front_design: fileFormat,
  content_design: fileFormat,
});

export const editDesignSchema = z.object({
  choose_design: z.string().min(2, "You must choose design"),
});

export const createVoucherFormSchema = z.object({
  code : z.string().min(3,"Voucher must be more than 3 characters").max(5,"Only 5 characters allowed"),
  description : z.string().min(2,"Description required"),
  amount: z.string()
})
