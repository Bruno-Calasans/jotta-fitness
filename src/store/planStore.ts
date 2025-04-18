"use client";

import { DATA_PLANS } from "@/data/DATA_PLANS";
import { Plan } from "@/types/Plan.type";
import { v4 } from "uuid";
import { create } from "zustand";

type PlanState = {
  plans: Plan[];
  add: (input: Omit<Plan, "id" | "createdAt">) => void;
  remove: (id: string) => void;
  update: (id: string, input: Partial<Omit<Plan, "id">>) => void;
};

export const usePlanStore = create<PlanState>((set, get) => ({
  plans: [],
  add(input) {
    set((state) => ({
      plans: [...state.plans, { id: v4(), createdAt: new Date(), ...input }],
    }));
  },
  remove(id) {
    const updatedPlans = get().plans.filter((plan) => plan.id !== id);
    set((state) => ({ ...state, plans: updatedPlans }), true);
  },
  update(id, input) {
    const updatedPlans = get().plans.map((plan) => {
      if (plan.id === id) {
        return { ...plan, ...input };
      }
      return plan;
    });

    set((state) => ({ ...state, plans: updatedPlans }), true);
  },
}));
