"use client";

import DataTable from "@/components/custom/DataTable/DataTable";
import ContentContainer from "@/components/general/ContentContainer";
import { useMemberStore } from "@/store/memberStore";
import CreateMemberDialog from "@/components/dashboard/Members/CreateMemberDialog";
import { memberColumns } from "@/components/dashboard/Members/MemberTableColumns";
import MembersTab from "@/components/dashboard/Members/MembersTab";
import { useState } from "react";
import { Member } from "@/types/Member.type";

export default function DashboardMembers() {
  const { members } = useMemberStore();
  const [selectedMember, setSelectedMember] = useState<Member | null>();

  return (
    <ContentContainer>
      <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2">
        <p>Membros</p>
        <CreateMemberDialog />
      </div>

      <DataTable
        columns={memberColumns}
        data={members}
        noResultMsg="Nenhum membro encontrado"
        onRowSelection={setSelectedMember}
      />
      {selectedMember && <MembersTab member={selectedMember} />}
    </ContentContainer>
  );
}
