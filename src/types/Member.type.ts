import type { DB } from "./Db.typ";
import type { PlanPayment, ProductPayment } from "./Payment.type";
import type { Role } from "./Role.type";

export type Member = DB & {
  name: string;
  phone: string;
  role: Role | null;
  planPayments: PlanPayment[];
  productPayments: ProductPayment[];
};
