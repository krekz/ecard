import { z } from "zod";

export const completeResgistrationSchema = z.object({
    state: z.string().min(2, {
      message: "State is required.",
    }),
    district: z.string().min(2, {
      message: "District is required.",
    }),
    referral: z.string().min(2, {
      message: "Referral is required.",    }),
  });