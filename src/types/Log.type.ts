import type { Adhesion } from "./Adhesion.type";
import type { DB } from "./Db.typ";
import type { Expense } from "./Expense.type";
import type { Investment } from "./Investment.type";
import type { Member } from "./Member.type";
import type { Plan } from "./Plan.type";
import type { Product } from "./Product.type";

export type ProductPurchaseLog = DB & {
  type: "product-purchase";
  product: Product;
  amount: number;
  member: Member | string;
};

export type EnrollmentLog = DB & {
  type: "enrollment";
  plan: Plan;
  amount: number;
  member: Member;
};

export type PlanDiaryLog = DB & {
  type: "plan-diary";
  plan: Plan;
  member: Member | string;
};

export type AdhesionPaymentLog = DB & {
  type: "adhesion-payment";
  plan: Plan;
  adhesion: Adhesion;
  member: Member;
};

export type PlanLog = EnrollmentLog | PlanDiaryLog | AdhesionPaymentLog;

export type ExpenseLog = DB & {
  type: "expense";
  item: Expense;
  value: number;
};

export type InvestmentLog = DB & {
  type: "investment";
  item: Investment;
  value: number;
};

export type GainLog = ProductPurchaseLog | PlanLog;
export type LossLog = ExpenseLog | InvestmentLog;
export type Log = GainLog | LossLog;
