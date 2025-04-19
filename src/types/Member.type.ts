import type { DB } from "./Db.typ";
import type { PlanPayment, ProductPayment } from "./Payment.type";
import type { Plan } from "./Plan.type";
import type { Role } from "./Role.type";

export type Member = DB & {
  name: string;
  phone: string;
  plan: Plan | null;
  role: Role | null;
  payments: {
    plans: PlanPayment[];
    products: ProductPayment[];
  } | null;
};
