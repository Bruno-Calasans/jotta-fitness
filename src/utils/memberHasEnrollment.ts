import type { Member } from "@/types/Member.type";

export default function memberHasEnrollment(member: Member) {
  const enrollments = member.enrollments;
  return enrollments.length > 0;
}
