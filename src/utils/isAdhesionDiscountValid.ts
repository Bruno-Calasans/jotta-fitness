import type { Adhesion } from "@/types/Adhesion.type";
import { differenceInHours } from "date-fns";

export default function isAdhesionDiscountValid(adhesion: Adhesion) {
  return differenceInHours(adhesion.discountMaxDate, new Date()) > 0;
}
