import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Define the state and actions for the store
type AccountState = {
  selectedAccountIds: string[]; // Store multiple selected account IDs
};

type AccountActions = {
  setSelectedAccountIds: (ids: string[]) => void; // Allow setting multiple IDs
  addSelectedAccountId: (id: string) => void; // Add a single account ID to the array
  removeSelectedAccountId: (id: string) => void; // Remove an account ID from the array
};

// Create the Zustand store
export const useAccountStore = create<AccountState & AccountActions>()(
  devtools((set, get) => ({
    selectedAccountIds: [], // Initialize with an empty array

    // Set multiple account IDs
    setSelectedAccountIds: (ids: string[]) => set({ selectedAccountIds: ids }),

    // Add an account ID
    addSelectedAccountId: (id: string) => {
      const { selectedAccountIds } = get();
      set({ selectedAccountIds: [...selectedAccountIds, id] });
    },

    // Remove an account ID
    removeSelectedAccountId: (id: string) => {
      const { selectedAccountIds } = get();
      set({
        selectedAccountIds: selectedAccountIds.filter(
          (accountId) => accountId !== id
        ),
      });
    },
  }))
);
