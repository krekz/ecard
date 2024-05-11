import { CardFormProps } from "@/lib/types";
import { create } from "zustand";


interface StoreState {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  disableButton: boolean;
  setDisableButton: (disable: boolean) => void;
  eCardData: CardFormProps
  setECardData: (data:any) => void;
}

const useStore = create<StoreState>((set) => ({
  currentStep: 1,
  setCurrentStep: (step) => set({ currentStep: step }),
  eCardData: {} ,
  setECardData: (data) => set({ eCardData: data }),
  disableButton: false,
  setDisableButton: (disable) => set({ disableButton: disable }),
}));

export default useStore;
