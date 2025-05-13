import { addDays, differenceInDays } from "date-fns";
import getActiveEnrollmentsLeftDays from "./getActiveEnrollmentsLeftDays";
import type { Member } from "@/types/Member.type";
import type { Enrollment } from "@/types/Enrollment.type";

export default function updateEnrollment(
  oldEnrollment: Enrollment,
  member: Member,
  input: Partial<
    Enrollment & {
      createdBy: Member;
    }
  >
): Enrollment {
  
  const currentDate = new Date();
  const isMonthsDiff = !!input.months && input.months != oldEnrollment.months;
  const pastDays = differenceInDays(oldEnrollment.startsIn, new Date());
  const activeEnrollmentsLeftDays = getActiveEnrollmentsLeftDays(
    member.enrollments,
    [oldEnrollment.id]
  );

  return {
    ...oldEnrollment,
    ...input,
    startsIn: isMonthsDiff ? currentDate : oldEnrollment.startsIn,
    expiresIn:
      input.months && isMonthsDiff
        ? addDays(
            currentDate,
            input.months * 30 + activeEnrollmentsLeftDays - pastDays
          )
        : oldEnrollment.expiresIn,
  };
}
