import { Enrollment } from "@/types/Enrollment.type";
import { addDays } from "date-fns";
import getActivePlansLeftDays from "./getActiveEnrollmentsLeftDays";

export default function calcEnrollmentExpireDate(
  startsIn: Date,
  months: number,
  enrollments: Enrollment[] = [],
  excludeEnrollments: string[] = []
) {
  return addDays(
    startsIn,
    months * 30 + getActivePlansLeftDays(enrollments, excludeEnrollments)
  );
}
