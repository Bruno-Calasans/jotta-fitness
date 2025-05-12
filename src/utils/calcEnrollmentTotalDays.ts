import type { Enrollment } from "@/types/Enrollment.type";
import { differenceInDays } from "date-fns";

export default function calcEnrollmentTotalDays(enrollment: Enrollment) {
  return differenceInDays(enrollment.startsIn, enrollment.expiresIn);
}
