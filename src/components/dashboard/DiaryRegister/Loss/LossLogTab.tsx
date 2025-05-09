import DataTable from "@/components/custom/DataTable/DataTable";
import { lossLogColumns } from "./LossLogTableColumns";
import { useLogStore } from "@/store/logStore";
import CreateLossLogDialog from "./CreateLossLogDialog";
import { formatDate } from "date-fns";

export default function LossLogTab() {
  const { selectedDate, getAllLossLogs } = useLogStore();
  const lossLogs = getAllLossLogs();
  const filteredLossLogs = selectedDate
    ? lossLogs.filter(
        (log) =>
          formatDate(log.createdAt, "d/M/Y") ===
          formatDate(selectedDate, "d/M/Y")
      )
    : lossLogs;

  return (
    <div>
      {/* <p className="text-muted text-stone-500">
        Aqui você pode registrar todos os seus investimentos ou despesas.
      </p> */}
      <div>
        <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 mb-3">
          <p>Registro de Perdas</p>
          <CreateLossLogDialog />
        </div>
        <DataTable
          columns={lossLogColumns}
          data={filteredLossLogs}
          noResultMsg="Nenhuma registro de perda hoje"
        />
      </div>
    </div>
  );
}
