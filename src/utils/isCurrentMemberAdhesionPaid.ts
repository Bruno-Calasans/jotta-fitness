import { Adhesion } from "@/types/Adhesion.type";
import { Member } from "@/types/Member.type";

export default function isCurrentMemberAdhesionPaid(
  member: Member,
  currentAdhesion: Adhesion
) {
  return !!member.adhesionsPayments.find(
    (adhesion) => adhesion.year === currentAdhesion.year
  );
}
