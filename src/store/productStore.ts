"use client";

import { PRODUCTS_DATA } from "@/data/PRODUCTS_DATA";
import { create } from "zustand";
import generateDefaultDbFields from "@/utils/generateDefaultDbFields";
import type { DB } from "@/types/Db.type";
import type { Product } from "@/types/Product.type";

type ProductState = {
  products: Product[];
  add: (input: Omit<Product, keyof DB>) => void;
  remove: (productId: string) => void;
  update: (productId: string, input: Partial<Omit<Product, keyof DB>>) => void;
  getById: (productId: string) => Product | null;
  getByName: (productName: string) => Product | null;
  increaseAmount: (productId: string, amount: number) => void;
  decreaseAmount: (productId: string, amount: number) => void;
};

export const useProductStore = create<ProductState>((set, get) => ({
  products: PRODUCTS_DATA,
  add(input) {
    set((state) => ({
      products: [...state.products, { ...generateDefaultDbFields(), ...input }],
    }));
  },
  remove(id) {
    const updatedProducts = get().products.filter(
      (product) => product.id !== id,
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
  getByName(productName) {
    const foundProduct = get().products.find(
      (product) =>
        product.name.trim().toLowerCase() === productName.trim().toLowerCase(),
    );
    if (!foundProduct) return null;
    return foundProduct;
  },
  getById(productId) {
    const foundProduct = get().products.find(
      (product) => product.id === productId,
    );

    if (!foundProduct) return null;

    return foundProduct;
  },
  decreaseAmount(productId, amount) {
    const foundProduct = get().getById(productId);
    if (!foundProduct) return;

    get().update(productId, {
      amount: Math.max(foundProduct.amount - amount, 0),
    });
  },
  increaseAmount(productId, amount) {
    const foundProduct = get().getById(productId);
    if (!foundProduct) return;

    get().update(productId, {
      amount: foundProduct.amount + amount,
    });
  },
}));
