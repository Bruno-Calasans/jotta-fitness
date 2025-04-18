"use client";

import { Product } from "@/types/Product.type";
import { v4 } from "uuid";
import { create } from "zustand";

type ProductState = {
  products: Product[];
  add: (input: Omit<Product, "id" | "createdAt" | "updatedAt">) => void;
  remove: (id: string) => void;
  update: (id: string, input: Partial<Omit<Product, "id">>) => void;
};

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  add(input) {
    set((state) => ({
      products: [
        ...state.products,
        { id: v4(), createdAt: new Date(), updatedAt: new Date(), ...input },
      ],
    }));
  },
  remove(id) {
    const updatedProducts = get().products.filter(
      (product) => product.id !== id
    );
    set((state) => ({ ...state, products: updatedProducts }), true);
  },
  update(id, input) {
    const updatedProducts = get().products.map((product) => {
      if (product.id === id) {
        return { ...product, updatedAt: new Date(), ...input };
      }
      return product;
    });

    set((state) => ({ ...state, products: updatedProducts }), true);
  },
}));
