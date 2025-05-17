import type { PlanDiary } from "@/types/PlanDiary.type";

export default function calcPlanDiaryPrice({ plan, days }: PlanDiary) {
  return plan.diary * days;
}
