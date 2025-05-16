"use client";

import { EXPENSE_DATA } from "@/data/EXPENSE_DATA";
import { create } from "zustand";
import generateDbFields from "@/utils/generateDefaultDbFields";
import type { Expense } from "@/types/Expense.type";
import type { DB } from "@/types/Db.type";

type ExpenseState = {
  expenses: Expense[];
  add: (input: Omit<Expense, keyof DB>) => void;
  remove: (id: string) => void;
  update: (id: string, input: Partial<Omit<Expense, keyof DB>>) => void;
};

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: EXPENSE_DATA,
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
}));
