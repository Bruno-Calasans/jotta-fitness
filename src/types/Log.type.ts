import type { Adhesion } from "./Adhesion.type";
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

export type AdhesionPaymentLogData = {
  plan: Plan;
  adhesion: Adhesion;
  member: Member;
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
export type AdhesionPaymentLog = DB &
  AdhesionPaymentLogData & {
    type: "adhesion";
  };
export type PlanDiaryLog = DB & PlanDiaryLogData & { type: "plan-diary" };
export type LossLog = DB & LossLogData & { type: "expense" | "investment" };

export type LogData =
  | Omit<PurchaseLog, keyof DB>
  | Omit<EnrollmentLog, keyof DB>
  | Omit<AdhesionPaymentLog, keyof DB>
  | Omit<PlanDiaryLog, keyof DB>
  | Omit<LossLog, keyof DB>;

export type Log =
  | PurchaseLog
  | EnrollmentLog
  | AdhesionPaymentLog
  | PlanDiaryLog
  | LossLog;
