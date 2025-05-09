"use client";

import { EXPENSE_DATA } from "@/data/EXPENSE_DATA";
import { Expense } from "@/types/Expense.type";
import { v4 } from "uuid";
import { create } from "zustand";

type ExpenseState = {
  expenses: Expense[];
  add: (input: Omit<Expense, "id" | "createdAt" | "updatedAt">) => void;
  remove: (id: string) => void;
  update: (id: string, input: Partial<Omit<Expense, "id">>) => void;
};

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: EXPENSE_DATA,
  add(input) {
    set((state) => ({
      expenses: [
        ...state.expenses,
        { id: v4(), createdAt: new Date(), updatedAt: new Date(), ...input },
      ],
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
