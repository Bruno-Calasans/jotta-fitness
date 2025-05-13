import type { DB } from "./Db.type";
import type { Plan } from "./Plan.type";

export type Enrollment = DB & {
  plan: Plan;
  months: number;
  startsIn: Date;
  expiresIn: Date;
  lateFee: number;
};
