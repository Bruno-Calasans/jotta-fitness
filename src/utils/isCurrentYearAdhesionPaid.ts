import type { Member } from "@/types/Member.type";

export default function isCurrentYearAdhesionPaid(member: Member) {
  return member.adhesionsPayments.find(
    (adhesionsPayments) => adhesionsPayments.year === new Date().getFullYear()
  );
}
