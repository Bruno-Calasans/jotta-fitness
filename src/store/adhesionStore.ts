"use client";

import { ADHESION_DATA } from "@/data/ADHESION_DATA";
import { create } from "zustand";
import generateDefaultDbFields from "@/utils/generateDefaultDbFields";
import type { DB } from "@/types/Db.type";
import type { Adhesion } from "@/types/Adhesion.type";
import { persist } from "zustand/middleware";

type AdhesionState = {
  adhesions: Adhesion[];
  loading: boolean;
  setLoading: (value: boolean) => void;
  add: (input: Omit<Adhesion, keyof DB>) => void;
  remove: (id: string) => void;
  update: (id: string, input: Partial<Omit<Adhesion, "id">>) => void;
  getAdhesionByYear: (year: number) => Adhesion | null;
  getCurrentYearAdhesion: () => Adhesion | null;
};

export const useAdhesionStore = create<AdhesionState>()(
  persist(
    (set, get) => ({
      adhesions: ADHESION_DATA,
      loading: true,
      setLoading(value) {
        set(() => ({ loading: value }));
      },
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
          (adhesion) => adhesion.id !== id,
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
      getAdhesionByYear(year) {
        const adhesion = get().adhesions.find(
          (adhesion) => adhesion.year === year,
        );
        if (!adhesion) return null;
        return adhesion;
      },
      getCurrentYearAdhesion() {
        return get().getAdhesionByYear(new Date().getFullYear());
      },
    }),
    {
      name: "adhesion-storage",
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
