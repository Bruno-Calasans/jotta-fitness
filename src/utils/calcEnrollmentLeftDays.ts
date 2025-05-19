import type { Enrollment } from "@/types/Enrollment.type";
import { differenceInDays } from "date-fns";

export default function calcEnrollmentLeftDays(enrollment: Enrollment) {
  return differenceInDays(enrollment.expiresIn, new Date());
}
