import DataTable from "@/components/custom/data-table/DataTable";
import { lossLogColumns } from "./LossLogTableColumns";
import { useLogStore } from "@/store/logStore";
import CreateLossLogDialog from "./CreateLossLogDialog";
import SelectedDateNotResultMsg from "../SelectedDateNotResultMsg";
import { useEffect, useState } from "react";
import type { LossLog } from "@/types/Log.type";

export default function LossLogTab() {
  const { loading, selectedDate, getLogsByDate } = useLogStore();
  // const [lossLogs, setLossLogs] = useState<LossLog[]>([]);

  // useEffect(() => {
  //   if (selectedDate) {
  //     const logs = getLogsByDate(selectedDate, [
  //       "expense",
  //       "investment",
  //     ]) as LossLog[];
  //     setLossLogs(logs);
  //   }
  // }, [selectedDate]);

  const lossLogs = getLogsByDate(selectedDate || new Date(), [
    "expense",
    "investment",
  ]) as LossLog[];

  return (
    <div>
      <div>
        <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 mb-3">
          <p>Registro de Perdas</p>
          <CreateLossLogDialog />
        </div>
        <DataTable
          loading={loading}
          columns={lossLogColumns}
          data={lossLogs}
          noResultMsg={<SelectedDateNotResultMsg />}
          loadingMsg="Carregando registros de perda"
          inputSearchPlaceholder="Procurar registro de perda"
        />
      </div>
    </div>
  );
}
