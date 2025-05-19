import type { Adhesion } from "@/types/Adhesion.type";
import type { Member } from "@/types/Member.type";
import type { Plan } from "@/types/Plan.type";
import isAdhesionDiscountValid from "./isAdhesionDiscountValid";
import isMemberNewbie from "./isMemberNewbie";
import calcDiscount from "./calcDiscount";

export default function calcAdhesionPrice(
  adhesion: Adhesion,
  plan: Plan,
  member: Member,
) {
  let price = plan.price;
  const isNewbie = isMemberNewbie(member);
  const isDiscountValid = isAdhesionDiscountValid(adhesion);

  if (isDiscountValid) {
    if (isNewbie) price = calcDiscount(price, adhesion.newbieDiscount);
    else price = calcDiscount(price, adhesion.veteranDiscount);
  }

  return price;
}
