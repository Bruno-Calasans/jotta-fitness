import type { Product } from "@/types/Product.type";

export default function updateProduct(
  oldProduct: Product,
  input: Partial<Product>
): Product {
  return {
    ...oldProduct,
    ...input,
    updatedAt: new Date(),
  } as Product;
}
