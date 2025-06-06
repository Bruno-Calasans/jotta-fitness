import { ENROLLMENT_STATUS, Enrollment } from "@/types/Enrollment.type";
import calcEnrollmentLeftDays from "./calcEnrollmentLeftDays";

export default function classifyEnrollmentStatus(
  enrollment?: Enrollment | null
): ENROLLMENT_STATUS {
  if (!enrollment) return ENROLLMENT_STATUS.INATIVO;

  const leftDays = calcEnrollmentLeftDays(enrollment);
  if (leftDays <= 0) return ENROLLMENT_STATUS.VENCIDO;

  return ENROLLMENT_STATUS.VENCIDO;
}
