import { Member } from "@/types/Member.type";
import memberHasEnrollment from "./memberHasEnrollment";

export default function getCurrentMemberPlan(member: Member) {
  const hasEnrollment = memberHasEnrollment(member);
  if (!hasEnrollment) return null;
  return member.enrollments[member.enrollments.length - 1].plan;
}
