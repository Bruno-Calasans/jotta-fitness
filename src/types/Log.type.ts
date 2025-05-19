import type { Adhesion } from "./Adhesion.type";
import { AdhesionPayment } from "./AdhesionPayment.type";
import type { DB } from "./Db.type";
import type { Enrollment } from "./Enrollment.type";
import type { Expense } from "./Expense.type";
import type { Investment } from "./Investment.type";
import type { Member } from "./Member.type";
import type { Plan } from "./Plan.type";
import type { PlanDiary } from "./PlanDiary.type";
import type { Purchase } from "./Purchase.type";

export type PurchaseLogData = {
  purchase: Purchase;
  member?: Member;
};

export type EnrollmentLogData = {
  enrollment: Enrollment;
  member: Member;
};

export type PlanDiaryLogData = {
  planDiary: PlanDiary;
  member?: Member;
};

export type AdhesionLogData = {
  plan: Plan;
  adhesion: Adhesion;
  adhesionPayment: AdhesionPayment;
  member: Member;
  price: number;
};

export type LossLogData = {
  type: "expense" | "investment";
  item: Expense | Investment;
  value: number;
};

export type LogType =
  | "purchase"
  | "enrollment"
  | "adhesion"
  | "plan-diary"
  | "expense"
  | "investment";

export type PurchaseLog = DB & PurchaseLogData & { type: "purchase" };
export type EnrollmentLog = DB & EnrollmentLogData & { type: "enrollment" };
export type AdhesionLog = DB &
  AdhesionLogData & {
    type: "adhesion";
  };
export type PlanDiaryLog = DB & PlanDiaryLogData & { type: "plan-diary" };
export type LossLog = DB & LossLogData & { type: "expense" | "investment" };

export type LogData =
  | Omit<PurchaseLog, keyof DB>
  | Omit<EnrollmentLog, keyof DB>
  | Omit<AdhesionLog, keyof DB>
  | Omit<PlanDiaryLog, keyof DB>
  | Omit<LossLog, keyof DB>;

export type Log =
  | PurchaseLog
  | EnrollmentLog
  | AdhesionLog
  | PlanDiaryLog
  | LossLog;
