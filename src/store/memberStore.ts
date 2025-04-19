"use client";

import { MEMBERS_DATA } from "@/data/MEMBERS_DATA";
import { DB } from "@/types/Db.typ";
import { Member } from "@/types/Member.type";
import { PlanPayment } from "@/types/Payment.type";
import { v4 } from "uuid";
import { create } from "zustand";
import { add as addDate } from "date-fns";

type MemberState = {
  members: Member[];
  getById: (id: string) => Member | null;
  add: (input: Omit<Member, keyof DB>) => void;
  remove: (id: string) => void;
  update: (id: string, input: Partial<Omit<Member, keyof DB>>) => void;
  addPlanPayment: (
    id: string,
    input: Omit<PlanPayment, keyof DB | "startsIn" | "expiresIn">
  ) => void;
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
  getById(id) {
    const foundMember = get().members.find((member) => member.id === id);
    if (!foundMember) return null;
    return foundMember;
  },
  addPlanPayment(id, input) {
    const member = get().getById(id);

    if (!member) return;

    get().update(id, {
      ...member,
      payments: {
        ...member.payments,
        plans: [
          ...member.payments?.plans,
          {
            ...input,
            createdAt: new Date(),
            expiresIn: addDate(new Date(), {
              days: input.amount * 30,
            }),
          },
        ],
      },
    });
  },
}));
