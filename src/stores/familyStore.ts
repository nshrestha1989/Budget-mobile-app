import { FamilyMember } from "@/types/family";
import { create } from "zustand";
import { devtools } from "zustand/middleware";


// Define the state structure
type FamilyState = {
  members: FamilyMember[];
};

// Define the actions
type FamilyActions = {
  addMember: (member: FamilyMember) => void;
  removeMember: (memberId: number) => void;
};

// Create the store
export const useFamilyStore = create<FamilyState & FamilyActions>()(
  devtools((set, get) => ({
    members: [],
    addMember(member) {
      const members = get().members;
      if (!members.find((m) => m.familyId === member.familyId)) {
        set({
          members: [...members, member],
        });
      }
    },
    removeMember(memberId) {
      const members = get().members;
      set({
        members: members.filter((m) => m.familyId !== memberId),
      });
    },
  }))
);
