import getLastMemberEnrollment from "./getLastMemberEnrollment";
import type { Member } from "@/types/Member.type";

export default function getLastMemberPlan(member: Member) {
  const lastEnrollment = getLastMemberEnrollment(member);
  if (!lastEnrollment) return null;
  return lastEnrollment.plan;
}
