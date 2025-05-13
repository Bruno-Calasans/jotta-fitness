import type { Purchase } from "@/types/Purchase.type";

export default function updatePurchase(
  oldPurchase: Purchase,
  input: Partial<Purchase>
) {
  return {
    ...oldPurchase,
    ...input,
  } as Purchase;
}
