"use client";

import DataTable from "@/components/custom/data-table/DataTable";
import { membersColumns } from "@/components/dashboard/members/MembersTableColumns";
import { useMemberStore } from "@/store/memberStore";
import CreateMemberDialog from "./CreateMemberDialog";
import { Member } from "@/types/Member.type";
import { useRouter } from "next/navigation";

export default function MembersTable() {
  const router = useRouter();
  const { loading, members, setSelectedMember } = useMemberStore();

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
        loading={loading}
        columns={membersColumns}
        data={members}
        loadingMsg="Carregando membros"
        noResultMsg="Nenhum membro encontrado"
        inputSearchPlaceholder="Procurar membro"
        onRowSelection={clickMemberRowHandler}
      />
    </div>
  );
}
