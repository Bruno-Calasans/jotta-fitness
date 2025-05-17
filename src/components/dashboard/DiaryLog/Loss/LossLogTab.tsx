import DataTable from "@/components/custom/DataTable/DataTable";
import { lossLogColumns } from "./LossLogTableColumns";
import { useLogStore } from "@/store/logStore";
import CreateLossLogDialog from "./CreateLossLogDialog";
import isDateEqual from "@/utils/isDateEquals";
import SelectedDateNotResultMsg from "../SelectedDateNotResultMsg";

export default function LossLogTab() {
  const { loading, selectedDate, getAllLossLogs } = useLogStore();
  const lossLogs = getAllLossLogs();
  const filteredLossLogs = selectedDate
    ? lossLogs.filter((log) => isDateEqual(log.createdAt, selectedDate))
    : lossLogs;

  return (
    <div>
      <div>
        <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 mb-3">
          <p>Registro de Perdas</p>
          <CreateLossLogDialog />
        </div>
        <DataTable
          loading={loading}
          loadingMsg="Carregando registros de perda"
          columns={lossLogColumns}
          data={filteredLossLogs}
          noResultMsg={<SelectedDateNotResultMsg />}
        />
      </div>
    </div>
  );
}
