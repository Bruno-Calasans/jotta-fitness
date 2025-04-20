"use client";

import DataTable from "@/components/custom/DataTable/DataTable";
import { memberColumns } from "@/components/dashboard/Members/MemberTableColumns";
import { useMemberStore } from "@/store/memberStore";
import CreateMemberDialog from "./CreateMemberDialog";
import { useRouter } from "next/navigation";
import { Member } from "@/types/Member.type";

export default function MembersTable() {
  const { members, setSelectedMember } = useMemberStore();
  const router = useRouter();

  const clickMemberRowHandler = (member: Member) => {
    setSelectedMember(member);
    router.push(`/dashboard/members/${member.id}`);
  };

  return (
    <div>
      <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 mb-3">
        <p>Membros</p>
        <CreateMemberDialog />
      </div>
      <DataTable
        columns={memberColumns}
        data={members}
        noResultMsg="Nenhum membro encontrado"
        onRowSelection={clickMemberRowHandler}
      />
    </div>
  );
}
