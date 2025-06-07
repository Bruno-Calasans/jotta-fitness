import { Enrollment, ENROLLMENT_STATUS } from "@/types/Enrollment.type";
import calcEnrollmentLeftDays from "./calcEnrollmentLeftDays";

export default function classifyEnrollmentStatus(
  enrollment: Enrollment | undefined | null,
): ENROLLMENT_STATUS {
  if (!enrollment) return ENROLLMENT_STATUS.INATIVO;

  const leftDays = calcEnrollmentLeftDays(enrollment);

  if (leftDays <= 0) return ENROLLMENT_STATUS.VENCIDO;

  return ENROLLMENT_STATUS.ATIVO;
}
