import type { Member } from "@/types/Member.type";
import memberHasEnrollment from "./memberHasEnrollment";

export default function getLastMemberEnrollment(member: Member) {
  const hasMemberEnrollment = memberHasEnrollment(member);
  if (!hasMemberEnrollment) return null;
  return member.enrollments[member.enrollments.length - 1];
}
