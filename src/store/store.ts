import { CardFormProps } from "@/lib/types";
import { create } from "zustand";
import { organizerSchema } from "../../schema/zod/ecard-form";
import { z } from "zod";

interface StoreState {
  currentStep: number;
  qrPreview: string | null;
  galleryPreview: (string | null)[] | null;
  formDataStore: z.infer<typeof organizerSchema>;

  setCurrentStep: (step: number) => void;
  setQrPreview: (qrPreview: string | null) => void;
  setGalleryPreview: (galleryPreview: (string | null)[] | null) => void;
  setFormDataStore: (formData: z.infer<typeof organizerSchema>) => void;
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
  setCurrentStep: (step) => set({ currentStep: step }),
  setQrPreview: (qrPreview) => set({ qrPreview }),
  setGalleryPreview: (galleryPreview) => set({ galleryPreview }),
  setFormDataStore: (formDataStore) => set({ formDataStore }),
}));

export default useStore;
