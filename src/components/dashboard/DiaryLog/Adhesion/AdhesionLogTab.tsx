import DataTable from "@/components/custom/DataTable/DataTable";
import { useLogStore } from "@/store/logStore";
import CreateAdhesionLogDialog from "./CreateAdhesionLogDialog";
import isDateEqual from "@/utils/isDateEquals";
import SelectedDateNotResultMsg from "../SelectedDateNotResultMsg";
import { adhesionLogColumns } from "./AdhesionLogColumns";

export default function AdhesionLogTab() {
  const { selectedDate, getAllAdhesionLogs } = useLogStore();
  const adhesionLogs = getAllAdhesionLogs();
  const filteredAdhesionLogs = selectedDate
    ? adhesionLogs.filter((log) => isDateEqual(log.createdAt, selectedDate))
    : adhesionLogs;

  return (
    <div>
      <div>
        <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 mb-3">
          <p>Registro de Adesões</p>
          <CreateAdhesionLogDialog />
        </div>
        <DataTable
          columns={adhesionLogColumns}
          data={filteredAdhesionLogs}
          noResultMsg={<SelectedDateNotResultMsg />}
        />
      </div>
    </div>
  );
}
