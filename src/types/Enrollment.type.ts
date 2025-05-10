import type { DB } from "./Db.type";
import { Member } from "./Member.type";
import type { Plan } from "./Plan.type";

export type Enrollment = DB & {
  plan: Plan;
  months: number;
  startsIn: Date;
  expiresIn: Date;
  createdBy: Member;
  lateFee: number;
};
