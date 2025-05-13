"use client";

import DataTable from "@/components/custom/DataTable/DataTable";
import { membersColumns } from "@/components/dashboard/Members/MembersTableColumns";
import { useMemberStore } from "@/store/memberStore";
import CreateMemberDialog from "./CreateMemberDialog";
import { useRouter } from "next/navigation";

export default function MembersTable() {
  const { members } = useMemberStore();

  return (
    <div>
      <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 mb-3">
        <p>Membros</p>
        <CreateMemberDialog />
      </div>
      <DataTable
        columns={membersColumns}
        data={members}
        noResultMsg="Nenhum membro encontrado"
        // onRowSelection={clickMemberRowHandler}
      />
    </div>
  );
}
