import { useEnrollmentResume } from "@/hooks/use-enrollment-resume";
import { useMemberStore } from "@/store/memberStore";
import NewbieBadge from "@/components/custom/NewbieBadge";
import VeteranBadge from "@/components/custom/VeteranBadge";
import defaultDateFormat from "@/utils/defaultDateFormat";

export default function MemberSinceInfo() {
  const { selectedMember } = useMemberStore();
  const { isNewbie } = useEnrollmentResume();

  return (
    <div className="flex items-center gap-1 text-md text-stone-300">
      <span className="font-bold">Membro desde:</span>{" "}
      {selectedMember
        ? defaultDateFormat(selectedMember.createdAt)
        : "Ainda não é membro"}{" "}
      {isNewbie ? <NewbieBadge /> : <VeteranBadge />}
    </div>
  );
}
