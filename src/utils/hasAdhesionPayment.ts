import type { Member } from "@/types/Member.type";

export default function hasAdhesionPayment(member: Member) {
  return member.adhesionsPayments.length === 0;
}
