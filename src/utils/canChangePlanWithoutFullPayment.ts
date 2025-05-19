import type { Enrollment } from "@/types/Enrollment.type";
import calcEnrollmentUsedDays from "./calcEnrollmentUsedDays";
import { BUSINESS_RULES } from "@/config/BusinessRules";

export default function canChangePlanWithoutFullPayment(
  enrollment: Enrollment,
) {
  const usedDays = calcEnrollmentUsedDays(enrollment);
  return usedDays <= BUSINESS_RULES.daysBeforeChangePlanWithoutTax;
}
