"use client";

import { INVESTIMENT_DATA } from "@/data/INVESTIMENT_DATA";
import { create } from "zustand";
import type { DB } from "@/types/Db.type";
import type { Investment } from "@/types/Investment.type";
import generateDbFields from "@/utils/generateDefaultDbFields";
import { persist } from "zustand/middleware";

type InvestmentState = {
  investments: Investment[];
  add: (input: Omit<Investment, keyof DB>) => void;
  remove: (id: string) => void;
  update: (id: string, input: Partial<Omit<Investment, keyof DB>>) => void;
};

export const useInvestmentStore = create<InvestmentState>()(
  persist(
    (set, get) => ({
      investments: INVESTIMENT_DATA,
      add(input) {
        set((state) => ({
          investments: [
            ...state.investments,
            { ...generateDbFields(), ...input },
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
    }),
    { name: "investment-storage" }
  )
);
