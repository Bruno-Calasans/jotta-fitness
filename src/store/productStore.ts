"use client";

import { PRODUCTS_DATA } from "@/data/PRODUCTS_DATA";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DB } from "@/types/Db.type";
import type { Product } from "@/types/Product.type";
import type { Optional } from "@/types/Optional.type";
import createProduct from "@/utils/createProduct";
import updateProduct from "@/utils/updateProduct";

type ProductState = {
  products: Product[];
  loading: boolean;
  setLoading: (value: boolean) => void;
  add: (input: Optional<Omit<Product, keyof DB>, "expiredAmount">) => void;
  remove: (productId: string) => void;
  update: (productId: string, input: Partial<Omit<Product, keyof DB>>) => void;
  getById: (productId: string) => Product | null;
  getByName: (productName: string) => Product | null;
  increaseAmount: (productId: string, amount: number) => void;
  decreaseAmount: (productId: string, amount: number) => void;
};

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: PRODUCTS_DATA,
      loading: true,
      setLoading(value) {
        set(() => ({ loading: value }));
      },
      add(input) {
        set((state) => ({
          products: [...state.products, createProduct(input)],
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
            return updateProduct(product, input);
          }
          return product;
        });

        set((state) => ({ ...state, products: updatedProducts }), true);
      },
      getByName(productName) {
        const foundProduct = get().products.find(
          (product) =>
            product.name.trim().toLowerCase() ===
            productName.trim().toLowerCase()
        );
        if (!foundProduct) return null;
        return foundProduct;
      },
      getById(productId) {
        const foundProduct = get().products.find(
          (product) => product.id === productId
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
    }),
    {
      name: "product-storage",
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
