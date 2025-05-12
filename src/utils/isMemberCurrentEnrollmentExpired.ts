import type { Member } from "@/types/Member.type";
import getLastMemberEnrollment from "./getLastMemberEnrollment";
import calcEnrollmentLeftDays from "./calcEnrollmentLeftDays";

export default function isMemberCurrentEnrollmentExpired(member: Member) {
  const lastMemberEnrollment = getLastMemberEnrollment(member);
  if (!lastMemberEnrollment) return true;

  const enrollmentLeftDays = calcEnrollmentLeftDays(lastMemberEnrollment);

  return enrollmentLeftDays < 0;
}
