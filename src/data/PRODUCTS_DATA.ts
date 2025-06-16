import { Product } from "@/types/Product.type";
import generateDefaultDbFields from "@/utils/generateDefaultDbFields";

export const PRODUCTS_DATA: Product[] = [
  {
    ...generateDefaultDbFields(),
    name: "Monster",
    amount: 10,
    price: 10,
    expiredAmount: 0,
  },
  {
    ...generateDefaultDbFields(),
    name: "Bala de Whey",
    amount: 5,
    price: 5,
    expiredAmount: 2,
  },
  {
    ...generateDefaultDbFields(),
    name: "Suco de Cajá",
    amount: 10,
    price: 6,
    expiredAmount: 0,
  },
  {
    ...generateDefaultDbFields(),
    name: "Suco de Piroca",
    amount: 0,
    price: 6,
    expiredAmount: 0,
  },
];
