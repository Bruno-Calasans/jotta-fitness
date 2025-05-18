"use client";

import type { Log } from "@/types/Log.type";
import groupLogsByType from "./groupLogsByType";
import sumPurchaseLogs from "./sumPurchaseLogs";
import sumEnrollmentLogs from "./sumEnrollmentLogs";
import sumPlanDiaryLogs from "./sumPlanDiaryLogs";
import sumAdhesionLogs from "./sumAdhesionLogs";
import sumLossLogs from "./sumLossLogs";
import sumProfit from "./sumProfit";

export type ProfitInfo = {
  profit: number;
  purchaseIncome: number;
  enrollmentIncome: number;
  planDiaryIncome: number;
  adhesionIncome: number;
  expenseLoss: number;
  investmentLoss: number;
};

export const defaultProfitInfo: ProfitInfo = {
  profit: 0,
  purchaseIncome: 0,
  enrollmentIncome: 0,
  planDiaryIncome: 0,
  adhesionIncome: 0,
  expenseLoss: 0,
  investmentLoss: 0,
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
    [investmentLoss, expenseLoss]
  );

  // return profitInfo

  return {
    profit,
    purchaseIncome,
    enrollmentIncome,
    planDiaryIncome,
    adhesionIncome,
    expenseLoss,
    investmentLoss,
  } as ProfitInfo;
}
