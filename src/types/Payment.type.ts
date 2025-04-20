import type { DB } from "./Db.typ";
import { Member } from "./Member.type";
import type { Plan } from "./Plan.type";
import type { Product } from "./Product.type";

export type PlanPayment = DB & {
  plan: Plan;
  months: number;
  startsIn: Date;
  expiresIn: Date;
  createdBy: Member;
};

export type ProductPayment = DB & {
  product: Product;
  amount: number;
  createdBy: Member;
};
