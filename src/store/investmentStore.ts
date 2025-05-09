"use client";

import { INVESTIMENT_DATA } from "@/data/INVESTIMENT_DATA";
import { Investment } from "@/types/Investment.type";
import { v4 } from "uuid";
import { create } from "zustand";

type InvestmentState = {
  investments: Investment[];
  add: (input: Omit<Investment, "id" | "createdAt" | "updatedAt">) => void;
  remove: (id: string) => void;
  update: (id: string, input: Partial<Omit<Investment, "id">>) => void;
};

export const useInvestmentStore = create<InvestmentState>((set, get) => ({
  investments: INVESTIMENT_DATA,
  add(input) {
    set((state) => ({
      investments: [
        ...state.investments,
        { id: v4(), createdAt: new Date(), updatedAt: new Date(), ...input },
      ],
    }));
  },
  remove(id) {
    const updatedInvestments = get().investments.filter(
      (investment) => investment.id !== id
    );
    set((state) => ({ ...state, investments: updatedInvestments }), true);
  },
  update(id, input) {
    const updatedInvestments = get().investments.map((investment) => {
      if (investment.id === id) {
        return { ...investment, updatedAt: new Date(), ...input };
      }
      return investment;
    });

    set((state) => ({ ...state, investments: updatedInvestments }), true);
  },
}));
