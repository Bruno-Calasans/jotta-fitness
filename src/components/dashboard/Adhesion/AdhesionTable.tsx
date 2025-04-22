"use client";

import DataTable from "@/components/custom/DataTable/DataTable";
import { adhesionColumns } from "./AdhesionTableColumns";
import { useAdhesionStore } from "@/store/adhesionStore";
import CreateAdhesionDialog from "./CreateAdhesionDialog";

type AdhesionTableProps = {};

export default function AdhesionTable({}: AdhesionTableProps) {
  const { adhesions } = useAdhesionStore();

  return (
    <>
      <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2">
        <p>Adesão</p>
        <CreateAdhesionDialog />
      </div>

      <DataTable
        columns={adhesionColumns}
        data={adhesions}
        noResultMsg="Nenhuma despesa encontrada"
        columnNameFilter="year"
      />
    </>
  );
}
