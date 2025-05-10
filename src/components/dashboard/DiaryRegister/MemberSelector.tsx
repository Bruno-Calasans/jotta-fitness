import Selector from "@/components/custom/Selector";
import { useMemberStore } from "@/store/memberStore";
import type { Member } from "@/types/Member.type";

type MemberSelectorProps = {
  value?: string;
  onValueChange: (value: string) => void;
  onItemSelected: (item: Member) => void;
};

export default function MemberSelector({
  value,
  onValueChange,
  onItemSelected,
}: MemberSelectorProps) {
  const { members } = useMemberStore();

  const memberData = members.map((member) => ({
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
      placeholder="Selecione um Membro"
    />
  );
}
