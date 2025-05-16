import getActiveEnrollments from "./getActiveEnrollments";
import { addDays } from "date-fns";
import type { DB } from "@/types/Db.type";
import type { PlanDiary } from "@/types/PlanDiary.type";
import type { Member } from "@/types/Member.type";

export default function updatePlanDiary(
  oldPlanDiary: PlanDiary,
  input: Omit<PlanDiary, keyof DB | "expiresIn">,
  member?: Member,
): PlanDiary {
  const activePayments = member && getActiveEnrollments(member.enrollments);
  const lastActivePayment =
    activePayments && activePayments[activePayments.length - 1];
  const isUpdateDiff = input.days != oldPlanDiary.days;

  const newExpiresIn =
    isUpdateDiff && lastActivePayment
      ? addDays(lastActivePayment.expiresIn, input.days)
      : addDays(new Date(), input.days);

  return {
    ...oldPlanDiary,
    ...input,
    expiresIn: newExpiresIn,
  };
}
