import {
  AdhesionLog,
  EnrollmentLog,
  Log,
  LogType,
  LossLog,
  PlanDiaryLog,
  PurchaseLog,
} from "@/types/Log.type";
import groupBy from "./groupBy";

export default function groupLogsByType(logs: Log[]) {
  const groupedLogs = groupBy(logs, "type") as Record<LogType, Log[]>;

  return {
    enrollmentLogs: (groupedLogs["enrollment"] || []) as EnrollmentLog[],
    purchaseLogs: (groupedLogs["purchase"] || []) as PurchaseLog[],
    planDiaryLogs: (groupedLogs["plan-diary"] || []) as PlanDiaryLog[],
    adhesionLogs: (groupedLogs["adhesion"] || []) as AdhesionLog[],
    expenseLogs: (groupedLogs["expense"] || []) as LossLog[],
    investmentLogs: (groupedLogs["investment"] || []) as LossLog[],
  };
}
