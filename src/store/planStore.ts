"use client";

import { PLANS_DATA } from "@/data/PLANS_DATA";
import type { DB } from "@/types/Db.type";
import type { Plan } from "@/types/Plan.type";
import { create } from "zustand";
import generateDbFields from "@/utils/generateDefaultDbFields";
import { persist } from "zustand/middleware";

type PlanState = {
  plans: Plan[];
  loading: boolean;
  setLoading: (value: boolean) => void;
  getByName: (planName: string) => Plan | null;
  add: (input: Omit<Plan, keyof DB>) => void;
  remove: (id: string) => void;
  update: (id: string, input: Partial<Omit<Plan, "id">>) => void;
};

export const usePlanStore = create<PlanState>()(
  persist(
    (set, get) => ({
      plans: PLANS_DATA,
      loading: true,
      setLoading(value) {
        set(() => ({ loading: value }));
      },
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
          (plan) =>
            plan.name.trim().toLowerCase() === planName.trim().toLowerCase(),
        );
        if (!foundPlan) return null;

        return foundPlan;
      },
    }),
    {
      name: "plan-storage",
      onRehydrateStorage: (state) => {
        return (state, error) => {
          if (error) {
            console.log(error);
          } else {
            state?.setLoading(false);
          }
        };
      },
    },
  ),
);
