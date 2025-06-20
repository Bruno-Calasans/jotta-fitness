import type { DB } from "@/types/Db.type";
import type { Optional } from "@/types/Optional.type";
import type { Product } from "@/types/Product.type";
import generateDefaultDbFields from "./generateDefaultDbFields";

export default function createProduct(
  input: Optional<Omit<Product, keyof DB>, "expiredAmount">
): Product {
  return {
    ...generateDefaultDbFields(),
    ...input,
    expiredAmount: input.expiredAmount || 0,
  };
}
