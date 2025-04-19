"use client";

import { MEMBERS_DATA } from "@/data/MEMBERS_DATA";
import { Member } from "@/types/Member.type";
import { v4 } from "uuid";
import { create } from "zustand";

type MemberState = {
  members: Member[];
  add: (input: Omit<Member, "id" | "createdAt" | "updatedAt">) => void;
  remove: (id: string) => void;
  update: (id: string, input: Partial<Omit<Member, "id">>) => void;
};

export const useMemberStore = create<MemberState>((set, get) => ({
  members: MEMBERS_DATA,
  add(input) {
    set((state) => ({
      members: [
        ...state.members,
        { id: v4(), createdAt: new Date(), updatedAt: new Date(), ...input },
      ],
    }));
  },
  remove(id) {
    const updatedMembers = get().members.filter((member) => member.id !== id);
    set((state) => ({ ...state, members: updatedMembers }), true);
  },
  update(id, input) {
    const updatedMembers = get().members.map((member) => {
      if (member.id === id) {
        return { ...member, updatedAt: new Date(), ...input };
      }
      return member;
    });

    set((state) => ({ ...state, members: updatedMembers }), true);
  },
}));
