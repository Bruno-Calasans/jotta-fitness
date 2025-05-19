import { BUSINESS_RULES } from "@/config/BusinessRules";
import type { Member } from "@/types/Member.type";
import calcMemberDays from "./calcMemberDays";

export default function isMemberNewbie(member: Member) {
  const memberDays = calcMemberDays(member);
  return memberDays < BUSINESS_RULES.daysBeforeVeteran;
}
