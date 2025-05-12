import type { Member } from "@/types/Member.type";
import { differenceInDays } from "date-fns";

export default function calcMemberDays(member: Member) {
  return differenceInDays(member.createdAt, new Date());
}
