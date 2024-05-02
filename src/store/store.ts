import { create } from "zustand";


interface StoreState {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const useStore = create<StoreState>((set) => ({
  currentStep: 1,
  setCurrentStep: (step) => set({ currentStep: step }),
}));

export default useStore;
