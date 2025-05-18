import calcPurchasePrice from "./calcPurchasePrice";
import sumNumbers from "./sumNumbers";
import type { PurchaseLog } from "@/types/Log.type";

export default function sumPurchaseLogs(purchaseLogs: PurchaseLog[]) {
  if (purchaseLogs.length === 0) return 0;
  return purchaseLogs
    .map(({ purchase }) => calcPurchasePrice(purchase))
    .reduce(sumNumbers);
}
