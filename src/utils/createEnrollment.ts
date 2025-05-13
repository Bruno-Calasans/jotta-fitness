import generateDefaultDbFields from "./generateDefaultDbFields";
import { addDays } from "date-fns";
import getActivePlansLeftDays from "./getActiveEnrollmentsLeftDays";
import type { Enrollment } from "@/types/Enrollment.type";
import type { DB } from "@/types/Db.type";
import { Member } from "@/types/Member.type";

export default function createEnrollment(
  member: Member,
  input: Omit<Enrollment, keyof DB | "expiresIn" | "startsIn">
): Enrollment {
  return {
    ...input,
    ...generateDefaultDbFields(),
    startsIn: new Date(),
    expiresIn: addDays(
      new Date(),
      input.months * 30 + getActivePlansLeftDays(member.enrollments)
    ),
  };
}
