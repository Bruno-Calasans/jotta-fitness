"use client";

import type { Log } from "@/types/Log.type";
import groupLogsByType from "./groupLogsByType";
import sumPurchaseLogs from "./sumPurchaseLogs";
import sumEnrollmentLogs from "./sumEnrollmentLogs";
import sumPlanDiaryLogs from "./sumPlanDiaryLogs";
import sumAdhesionLogs from "./sumAdhesionLogs";
import sumLossLogs from "./sumLossLogs";
import sumProfit from "./sumProfit";

export type ProfitItem = { value: number; amount: number };

export type ProfitInfo = {
  profit: number;
  purchase: ProfitItem;
  enrollment: ProfitItem;
  planDiary: ProfitItem;
  adhesion: ProfitItem;
  expense: ProfitItem;
  investment: ProfitItem;
};

export const defaultProfitInfo: ProfitInfo = {
  profit: 0,
  purchase: { value: 0, amount: 0 },
  enrollment: { value: 0, amount: 0 },
  planDiary: { value: 0, amount: 0 },
  adhesion: { value: 0, amount: 0 },
  expense: { value: 0, amount: 0 },
  investment: { value: 0, amount: 0 },
};

export default function calcProfit(logs: Log[]) {
  if (logs.length === 0) return defaultProfitInfo;

  const {
    purchaseLogs,
    enrollmentLogs,
    planDiaryLogs,
    adhesionLogs,
    expenseLogs,
    investmentLogs,
  } = groupLogsByType(logs);

  //Gains
  const purchaseIncome = sumPurchaseLogs(purchaseLogs);
  const enrollmentIncome = sumEnrollmentLogs(enrollmentLogs);
  const planDiaryIncome = sumPlanDiaryLogs(planDiaryLogs);
  const adhesionIncome = sumAdhesionLogs(adhesionLogs);

  //   Losses
  const expenseLoss = sumLossLogs(expenseLogs);
  const investmentLoss = sumLossLogs(investmentLogs);

  const profit = sumProfit(
    [purchaseIncome, enrollmentIncome, planDiaryIncome, adhesionIncome],
    [investmentLoss, expenseLoss],
  );

  return {
    profit,
    purchase: { value: purchaseIncome, amount: purchaseLogs.length },
    enrollment: { value: enrollmentIncome, amount: enrollmentLogs.length },
    planDiary: { value: planDiaryIncome, amount: planDiaryLogs.length },
    adhesion: { value: adhesionIncome, amount: adhesionLogs.length },
    expense: { value: expenseLoss, amount: expenseLogs.length },
    investment: { value: investmentLoss, amount: investmentLogs.length },
  } as ProfitInfo;
}
