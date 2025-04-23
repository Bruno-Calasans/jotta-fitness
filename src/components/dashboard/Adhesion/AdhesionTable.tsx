"use client";

import DataTable from "@/components/custom/DataTable/DataTable";
import { adhesionColumns } from "./AdhesionTableColumns";
import { useAdhesionStore } from "@/store/adhesionStore";
import CreateAdhesionDialog from "./CreateAdhesionDialog";
import InfoMsg from "@/components/custom/InfoMsg";

type AdhesionTableProps = {};

export default function AdhesionTable({}: AdhesionTableProps) {
  const { adhesions } = useAdhesionStore();

  const currentYearAdhesion = adhesions.find(
    (adhesion) => adhesion.year === new Date().getFullYear()
  );

  return (
    <>
      <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2">
        <p>Adesão</p>
        <CreateAdhesionDialog />
      </div>
      {!currentYearAdhesion && (
        <InfoMsg>
          <p>Você ainda não definiu uma adesão para este ano.</p>
        </InfoMsg>
      )}
      <DataTable
        columns={adhesionColumns}
        data={adhesions}
        noResultMsg="Nenhuma adesão encontrada"
        columnNameFilter="year"
      />
    </>
  );
}
