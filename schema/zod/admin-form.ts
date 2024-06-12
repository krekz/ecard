import * as z from "zod";

const OPTIONAL_IMAGE = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file"
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 10;
  }, "File must be less than 10MB");

const REQUIRED_IMAGE = z
  .custom<File | undefined>()
  .refine(
    (file) => file && file instanceof File && file.type.startsWith("image/"),
    "Must be an image file"
  )
  .refine((file) => {
    return file && file.size < 1024 * 1024 * 10;
  }, "File must be less than 10MB");

export const uploadDesignSchema = z.object({
  design_name: z
    .string()
    .min(2, "Design name is required")
    .transform((str) => str.replace(/\s+/g, "")),
  category: z.string().min(2, "Category is required"),
  thumbnail_url: REQUIRED_IMAGE,
  front_design_url: REQUIRED_IMAGE,
  content_design_url: REQUIRED_IMAGE,
});

export const updateDesignSchema = z.object({
  design_name: z
    .string()
    .min(2, "Design name is required")
    .transform((str) => str.replace(/\s+/g, "")),
  category: z.string().min(2, "Category is required"),
  thumbnail_url: OPTIONAL_IMAGE,
  front_design_url: OPTIONAL_IMAGE,
  content_design_url: OPTIONAL_IMAGE,
});

export const createVoucherFormSchema = z.object({
  code: z.string().min(3, "Voucher must be more than 3 characters"),
  description: z.string().min(2, "Description required"),
  max_claims: z.coerce.number(),
});
