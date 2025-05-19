import { Button } from "@/components/ui/button";
import { useMemberStore } from "@/store/memberStore";
import { Member } from "@/types/Member.type";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";

type MoreDetailsProps = {
  member: Member;
};

export default function MoreDetails({ member }: MoreDetailsProps) {
  const { setSelectedMember } = useMemberStore();
  const router = useRouter();

  const clickMemberRowHandler = () => {
    setSelectedMember(member);
    router.push(`/dashboard/members/${member.id}`);
  };

  return (
    <Button
      onClick={clickMemberRowHandler}
      variant="ghost"
      className="w-full flex items-center justify-start gap-1"
    >
      <Info className="h-4 w-4" />
      Mais detalhes
    </Button>
  );
}
