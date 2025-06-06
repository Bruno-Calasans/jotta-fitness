import DataTable from "@/components/custom/data-table/DataTable";
import { useLogStore } from "@/store/logStore";
import CreateAdhesionLogDialog from "./CreateAdhesionLogDialog";
import SelectedDateNotResultMsg from "../SelectedDateNotResultMsg";
import { adhesionLogColumns } from "./AdhesionLogColumns";
import { AdhesionLog } from "@/types/Log.type";
import { useEffect, useState } from "react";

export default function AdhesionLogTab() {
  const { loading, selectedDate, getLogsByDate } = useLogStore();
  const [adhesionLogs, setadhesionLogs] = useState<AdhesionLog[]>([]);

  useEffect(() => {
    if (selectedDate) {
      const logs = getLogsByDate(selectedDate, ["adhesion"]) as AdhesionLog[];
      setadhesionLogs(logs);
    }
  }, [selectedDate]);

  return (
    <div>
      <div>
        <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 mb-3">
          <p>Registro de Adesões</p>
          <CreateAdhesionLogDialog />
        </div>
        <DataTable
          loading={loading}
          columns={adhesionLogColumns}
          data={adhesionLogs}
          noResultMsg={<SelectedDateNotResultMsg />}
          loadingMsg="Carregando registros de adesão"
          inputSearchPlaceholder="Procurar registro de adesão"
        />
      </div>
    </div>
  );
}
