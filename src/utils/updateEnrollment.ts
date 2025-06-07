import type { Member } from "@/types/Member.type";
import type { Enrollment } from "@/types/Enrollment.type";
import type { CreateEnrollmentInput } from "./createEnrollment";
import calcEnrollmentExpireDate from "./calcEnrollmentExpireDate";

export type UpdateEnrollmentInput = Partial<CreateEnrollmentInput>;

export default function updateEnrollment(
  oldEnrollment: Enrollment,
  member: Member,
  input: UpdateEnrollmentInput
): Enrollment {
  const startsIn = input.startsIn || oldEnrollment.startsIn;
  const months = input.months || oldEnrollment.months;
  const expiresIn =
    input.expiresIn ||
    calcEnrollmentExpireDate(startsIn, months, member.enrollments, [
      oldEnrollment.id,
    ]);

  return {
    ...oldEnrollment,
    ...input,
    startsIn,
    expiresIn,
  };
}
