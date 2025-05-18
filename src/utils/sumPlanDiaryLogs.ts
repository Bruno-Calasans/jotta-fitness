import calcPlanDiaryPrice from "./calcPlanDiaryPrice";
import sumNumbers from "./sumNumbers";
import type { PlanDiaryLog } from "@/types/Log.type";

export default function sumPlanDiaryLogs(planDiaryLogs: PlanDiaryLog[]) {
  if (planDiaryLogs.length === 0) return 0;
  return planDiaryLogs
    .map(({ planDiary }) => calcPlanDiaryPrice(planDiary))
    .reduce(sumNumbers);
}
