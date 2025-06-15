import { Product } from "@/types/Product.type";

export default function calcProductAvaliableAmount(product: Product) {
  return Math.max(product.amount - product.expiredAmount, 0);
}
