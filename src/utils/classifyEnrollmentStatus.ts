import { Enrollment, ENROLLMENT_STATUS } from "@/types/Enrollment.type";
import calcEnrollmentLeftDays from "./calcEnrollmentLeftDays";

export default function classifyEnrollmentStatus(
  enrollment: Enrollment | undefined | null
): ENROLLMENT_STATUS {
  if (!enrollment) return ENROLLMENT_STATUS.INACTIVE;

  const leftDays = calcEnrollmentLeftDays(enrollment);

  if (leftDays <= 0) return ENROLLMENT_STATUS.EXPIRED;

  return ENROLLMENT_STATUS.ACTIVE;
}
