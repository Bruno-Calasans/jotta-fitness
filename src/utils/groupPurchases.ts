import { Purchase } from "@/types/Purchase.type";
import groupBy from "./groupBy";

export default function groupPurchases(purchases: Purchase[]) {
  const groupedPurchases = groupBy(purchases, "product");
}
