"use client";

import { EXPENSE_DATA } from "@/data/EXPENSE_DATA";
import { create } from "zustand";
import generateDbFields from "@/utils/generateDefaultDbFields";
import type { Expense } from "@/types/Expense.type";
import type { DB } from "@/types/Db.type";
import { persist } from "zustand/middleware";

type ExpenseState = {
  loading: boolean;
  expenses: Expense[];
  add: (input: Omit<Expense, keyof DB>) => void;
  remove: (id: string) => void;
  update: (id: string, input: Partial<Omit<Expense, keyof DB>>) => void;
  setLoading: (value: boolean) => void;
};

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set, get) => ({
      loading: true,
      expenses: EXPENSE_DATA,
      setLoading(value) {
        set(() => ({ loading: value }));
      },
      add(input) {
        set((state) => ({
          expenses: [...state.expenses, { ...generateDbFields(), ...input }],
        }));
      },
      remove(id) {
        const updatedExpenses = get().expenses.filter(
          (expense) => expense.id !== id
        );
        set((state) => ({ ...state, expenses: updatedExpenses }), true);
      },
      update(id, input) {
        const updatedExpenses = get().expenses.map((expense) => {
          if (expense.id === id) {
            return { ...expense, updatedAt: new Date(), ...input };
          }
          return expense;
        });

        set((state) => ({ ...state, expenses: updatedExpenses }), true);
      },
    }),
    {
      name: "expense-storage",
      onRehydrateStorage: (state) => {
        return (state, error) => {
          if (error) {
            console.log(error);
          } else {
            state?.setLoading(false);
          }
        };
      },
    }
  )
);
