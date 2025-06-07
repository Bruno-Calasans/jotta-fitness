import generateDefaultDbFields from "./generateDefaultDbFields";
import calcEnrollmentExpireDate from "./calcEnrollmentExpireDate";
import type { Enrollment } from "@/types/Enrollment.type";
import type { DB } from "@/types/Db.type";
import type { Member } from "@/types/Member.type";
import type { Optional } from "@/types/Optional.type";

export type CreateEnrollmentInput = Optional<
  Omit<Enrollment, keyof DB>,
  "startsIn" | "expiresIn"
>;

export default function createEnrollment(
  member: Member,
  input: CreateEnrollmentInput,
): Enrollment {
  const startsIn = input.startsIn || new Date();
  const expiresIn =
    input.expiresIn ||
    calcEnrollmentExpireDate(startsIn, input.months, member.enrollments);

  return {
    ...generateDefaultDbFields(),
    ...input,
    startsIn,
    expiresIn,
  };
}
