import getLastMemberEnrollment from "./getLastMemberEnrollment";
import type { Member } from "@/types/Member.type";

export default function getLastMemberPlan(member: Member) {
  const lastEnrollment = getLastMemberEnrollment(member);
  return lastEnrollment ? lastEnrollment.plan : null;
}
