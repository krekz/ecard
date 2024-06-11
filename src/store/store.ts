import { CardFormProps } from "@/lib/types";
import { create } from "zustand";
import { organizerSchema, voucherClaimSchema } from "../../schema/zod/ecard-form";
import { z } from "zod";

interface StoreState {
  currentStep: number;
  qrPreview: string | null;
  galleryPreview: (string | null)[] | null;
  formDataStore: z.infer<typeof organizerSchema>;
  voucherStore: z.infer<typeof voucherClaimSchema>

  setCurrentStep: (step: number) => void;
  setQrPreview: (qrPreview: string | null) => void;
  setGalleryPreview: (galleryPreview: (string | null)[] | null) => void;
  setFormDataStore: (formData: z.infer<typeof organizerSchema>) => void;
  setVoucherStore: (voucherStore: z.infer<typeof voucherClaimSchema>) => void;
}

const useStore = create<StoreState>((set) => ({
  currentStep: 1,
  qrPreview: null,
  galleryPreview: null,
  formDataStore: {
    father: "",
    mother: "",
    bride: "",
    groom: "",
    couple: "",
    phone_number: "",
    design_id: "",
    primary_font: "",
    secondary_font: "",
    date: new Date(),
    venue: "",
    address: "",
    greeting: "",
    program_name: ["", "", ""],
    program_time: ["", "", ""],
    google_map: null,
    youtube_url: null,
    qrcode: undefined,
    wedding_images: undefined,
  },
  voucherStore: {
    voucher_code: "",
  },
  setCurrentStep: (step) => set({ currentStep: step }),
  setQrPreview: (qrPreview) => set({ qrPreview }),
  setGalleryPreview: (galleryPreview) => set({ galleryPreview }),
  setFormDataStore: (formDataStore) => set({ formDataStore }),
  setVoucherStore: (voucherStore) => set({ voucherStore }),
}));

export default useStore;
