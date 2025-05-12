import type { Enrollment } from "@/types/Enrollment.type";
import calcEnrollmentTotalDays from "./calcEnrollmentTotalDays";
import calcEnrollmentLeftDays from "./calcEnrollmentLeftDays";

export default function calcEnrollmentUsedDays(enrollment: Enrollment) {
  const totalDays = calcEnrollmentTotalDays(enrollment);
  const leftDays = calcEnrollmentLeftDays(enrollment);
  return totalDays - leftDays;
}
