"use client";

import DataTable from "@/components/custom/data-table/DataTable";
import { adhesionColumns } from "./AdhesionTableColumns";
import { useAdhesionStore } from "@/store/adhesionStore";
import CreateAdhesionDialog from "./CreateAdhesionDialog";
import InfoMsg from "@/components/custom/msgs/InfoMsg";

export default function AdhesionTable() {
  const { loading, adhesions } = useAdhesionStore();

  const currentYearAdhesion = adhesions.find(
    (adhesion) => adhesion.year === new Date().getFullYear(),
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
        loading={loading}
        columns={adhesionColumns}
        data={adhesions}
        columnNameFilter="year"
        loadingMsg="Carregando Adesões"
        noResultMsg="Nenhuma adesão encontrada"
        inputSearchPlaceholder="Pesquisar adesão"
      />
    </>
  );
}
