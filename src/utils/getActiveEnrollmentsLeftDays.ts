import { differenceInDays } from "date-fns";
import getActiveEnrollments from "./getActiveEnrollments";
import type { Enrollment } from "@/types/Enrollment.type";

export default function getActiveEnrollmentsLeftDays(
  enrollments: Enrollment[],
  excludeEnrollmentIds: string[] = []
) {
  let totalLeftDays = 0;

  const activeEnrollments = getActiveEnrollments(enrollments);
  if (activeEnrollments.length === 0) return totalLeftDays;

  const filteredActiveEnrollments = activeEnrollments.filter(
    (enrollment) => !excludeEnrollmentIds.includes(enrollment.id)
  );

  if (filteredActiveEnrollments.length === 0) return totalLeftDays;

  // Get left days of last active enrollment
  const lasActivePayment =
    filteredActiveEnrollments[filteredActiveEnrollments.length - 1];

  // Calc left days
  const leftDays = differenceInDays(lasActivePayment.expiresIn, new Date());

  // plus 1 day correction
  if (leftDays > 0) {
    totalLeftDays += leftDays + 1;
  }

  return totalLeftDays;
}
