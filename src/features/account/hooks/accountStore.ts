import { create } from "zustand";
import { devtools } from "zustand/middleware";

type AccountState = {
  selectedAccountId: string | null; 
};

type AccountActions = {
  setSelectedAccountId: (id: string|null) => void; 
  clearSelectedAccountId: () => void; 
};

export const useAccountStore = create<AccountState & AccountActions>()(
  devtools((set) => ({
    selectedAccountId: null, 
    setSelectedAccountId: (id: string|null) => set({ selectedAccountId: id }),

    clearSelectedAccountId: () => set({ selectedAccountId: null }),
  }))
);
