import type { AdhesionPayment } from "./AdhesionPayment.type";
import type { DB } from "./Db.type";
import type { Enrollment } from "./Enrollment.type";
import type { PlanDiary } from "./PlanDiary.type";
import type { Purchase } from "./Purchase.type";
import type { Role } from "./Role.type";

export type Member = DB & {
  name: string;
  phone: string;
  role: Role | null;
  enrollments: Enrollment[];
  purchases: Purchase[];
  adhesionsPayments: AdhesionPayment[];
  diaries: PlanDiary[];
};
