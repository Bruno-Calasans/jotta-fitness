"use client";

import { ADHESION_DATA } from "@/data/ADHESION_DATA";
import type { Adhesion } from "@/types/Adhesion.type";
import { DB } from "@/types/Db.type";
import { create } from "zustand";
import generateDefaultDbFields from "@/utils/generateDefaultDbFields";

type AdhesionState = {
  adhesions: Adhesion[];
  add: (input: Omit<Adhesion, keyof DB>) => void;
  remove: (id: string) => void;
  update: (id: string, input: Partial<Omit<Adhesion, "id">>) => void;
  getCurretYearAdhesion: () => Adhesion | null;
};

export const useAdhesionStore = create<AdhesionState>((set, get) => ({
  adhesions: ADHESION_DATA,
  add(input) {
    set((state) => ({
      adhesions: [
        ...state.adhesions,
        { ...generateDefaultDbFields(), ...input },
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
  getCurretYearAdhesion() {
    const currentYearAdhesion = get().adhesions.find(
      (adhesion) => adhesion.year === new Date().getFullYear()
    );

    if (!currentYearAdhesion) return null;

    return currentYearAdhesion;
  },
}));
