import type { DB } from "./Db.type";
import type { Plan } from "./Plan.type";

export type PlanDiary = DB & {
  plan: Plan;
  days: number;
  expiresIn: Date;
};
