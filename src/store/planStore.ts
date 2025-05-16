"use client";

import { PLANS_DATA } from "@/data/PLANS_DATA";
import type { DB } from "@/types/Db.type";
import type { Plan } from "@/types/Plan.type";
import { create } from "zustand";
import generateDbFields from "@/utils/generateDefaultDbFields";

type PlanState = {
  plans: Plan[];
  getByName: (planName: string) => Plan | null;
  add: (input: Omit<Plan, keyof DB>) => void;
  remove: (id: string) => void;
  update: (id: string, input: Partial<Omit<Plan, "id">>) => void;
};

export const usePlanStore = create<PlanState>((set, get) => ({
  plans: PLANS_DATA,
  add(input) {
    set((state) => ({
      plans: [...state.plans, { ...generateDbFields(), ...input }],
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
  getByName(planName) {
    const foundPlan = get().plans.find(
      (plan) => plan.name.trim().toLowerCase() === planName.trim().toLowerCase()
    );
    if (!foundPlan) return null;

    return foundPlan;
  },
}));
