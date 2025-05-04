import type { Adhesion } from "./Adhesion.type";
import type { DB } from "./Db.typ";
import type { Enrollment } from "./Enrollment.type";
import type { Expense } from "./Expense.type";
import type { Investment } from "./Investment.type";
import type { Member } from "./Member.type";
import type { Plan } from "./Plan.type";
import type { PlanDiary } from "./PlanDiary.type";
import type { Purchase } from "./Purchase.type";

export type ProductPurchaseLog = {
  type: "product-purchase";
  purchase: Purchase;
  member: Member;
};

export type EnrollmentLog = {
  type: "enrollment";
  enrollment: Enrollment;
  member: Member;
};

export type PlanDiaryLog = {
  type: "plan-diary";
  planDiary: PlanDiary;
  member: Member;
};

export type AdhesionPaymentLog = {
  type: "adhesion-payment";
  plan: Plan;
  adhesion: Adhesion;
  member: Member;
};

export type PlanLog = EnrollmentLog | PlanDiaryLog | AdhesionPaymentLog;

export type ExpenseLog = {
  type: "expense";
  item: Expense;
  value: number;
};

export type InvestmentLog = {
  type: "investment";
  item: Investment;
  value: number;
};

export type GainLog = ProductPurchaseLog | PlanLog;
export type LossLog = ExpenseLog | InvestmentLog;
export type Log = DB & (GainLog | LossLog);
