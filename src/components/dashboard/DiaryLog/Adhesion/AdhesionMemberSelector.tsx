import Selector from "@/components/custom/Selector";
import { useMemberStore } from "@/store/memberStore";
import getLastMemberPlan from "@/utils/getLastMemberPlan";
import isCurrentYearAdhesionPaid from "@/utils/isCurrentYearAdhesionPaid";
import type { Member } from "@/types/Member.type";
import memberHasEnrollment from "@/utils/memberHasEnrollment";

type AdhesionMemberSelectorProps = {
  value?: string;
  onValueChange: (value: string) => void;
  onItemSelected: (item: Member) => void;
};

export default function AdhesionMemberSelector({
  value,
  onValueChange,
  onItemSelected,
}: AdhesionMemberSelectorProps) {
  const { members } = useMemberStore();

  const memberData = members
    .filter(
      (member) =>
        getLastMemberPlan(member) && !isCurrentYearAdhesionPaid(member)
    )
    .map((member) => ({
      label: member.name,
      value: member.name,
      item: member,
    }));

  return (
    <Selector
      value={value}
      data={memberData}
      itemAcessorKey="name"
      onValueChange={onValueChange}
      onItemSelect={onItemSelected}
      placeholder="Selecione um Membro que não pagou a Adesão deste ano"
    />
  );
}
