import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemberStore } from "@/store/memberStore";
import { Member } from "@/types/Member.type";

type MemberSelectorProps = {
  value: string;
  defaultValue: string;
  onValueChange: (value: string) => void;
  onSelected: (plan: Member) => void;
};

export default function MemberSelector({
  value,
  defaultValue,
  onSelected,
  onValueChange,
}: MemberSelectorProps) {
  const { members, setSelectedMember } = useMemberStore();

  const changeHandler = (value: string) => {
    const member = members.find(
      (member) => member.name.toLowerCase() === value.toLowerCase()
    )!;
    onValueChange(value);
    onSelected(member);
    setSelectedMember(member);
  };

  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      onValueChange={changeHandler}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione um membro" />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          {members.map((member) => (
            <SelectItem key={member.id} value={member.name}>
              {member.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
