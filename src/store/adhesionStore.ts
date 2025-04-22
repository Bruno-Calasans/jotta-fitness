"use client";

import type { Adhesion } from "@/types/Adhesion.type";
import { v4 } from "uuid";
import { create } from "zustand";

type AdhesionState = {
  adhesions: Adhesion[];
  add: (input: Omit<Adhesion, "id" | "createdAt" | "updatedAt">) => void;
  remove: (id: string) => void;
  update: (id: string, input: Partial<Omit<Adhesion, "id">>) => void;
};

export const useAdhesionStore = create<AdhesionState>((set, get) => ({
  adhesions: [],
  add(input) {
    set((state) => ({
      adhesions: [
        ...state.adhesions,
        { id: v4(), createdAt: new Date(), updatedAt: new Date(), ...input },
      ],
    }));
  },
  remove(id) {
    const updatedAdhesions = get().adhesions.filter(
      (adhesion) => adhesion.id !== id
    );
    set((state) => ({ ...state, adhesions: updatedAdhesions }), true);
  },
  update(id, input) {
    const updatedAdhesions = get().adhesions.map((adhesion) => {
      if (adhesion.id === id) {
        return { ...adhesion, updatedAt: new Date(), ...input };
      }
      return adhesion;
    });

    set((state) => ({ ...state, adhesions: updatedAdhesions }), true);
  },
}));
