import type { Purchase } from "@/types/Purchase.type";
import generateDefaultDbFields from "./generateDefaultDbFields";

export default function createPurchase(input: Partial<Purchase>) {
  return {
    ...generateDefaultDbFields(),
    ...input,
  } as Purchase;
}
