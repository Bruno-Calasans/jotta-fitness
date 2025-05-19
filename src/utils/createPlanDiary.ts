import generateDefaultDbFields from "./generateDefaultDbFields";
import getActiveEnrollments from "./getActiveEnrollments";
import { addDays } from "date-fns";
import type { DB } from "@/types/Db.type";
import type { PlanDiary } from "@/types/PlanDiary.type";
import type { Member } from "@/types/Member.type";

export default function createPlanDiary(
  input: Omit<PlanDiary, keyof DB | "expiresIn">,
  member?: Member,
): PlanDiary {
  const activeEnrollments = member && getActiveEnrollments(member.enrollments);
  const lastActiveEnrollment =
    activeEnrollments && activeEnrollments[activeEnrollments.length - 1];

  return {
    ...generateDefaultDbFields(),
    ...input,
    expiresIn: lastActiveEnrollment
      ? addDays(lastActiveEnrollment.expiresIn, input.days)
      : addDays(new Date(), input.days),
  };
}
