import type { Purchase } from "@/types/Purchase.type";

export default function calcPurchasePrice({ product, amount }: Purchase) {
  return product.price * amount;
}
