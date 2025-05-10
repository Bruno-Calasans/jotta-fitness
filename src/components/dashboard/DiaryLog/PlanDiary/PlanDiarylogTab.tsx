import DataTable from "@/components/custom/DataTable/DataTable";
import { useLogStore } from "@/store/logStore";
import { planDiaryColumns } from "./PlanDiaryTableColumns";
import CreatePlanDiaryLogDialog from "./CreatePlanDiaryLogDialog";
import isDateEqual from "@/utils/isDateEquals";
import SelectedDateNotResultMsg from "../SelectedDateNotResultMsg";

export default function PlanDiaryLogTab() {
  const { selectedDate, getAllPlanDiaryLogs } = useLogStore();

  const planDiaryLogs = getAllPlanDiaryLogs();
  const filteredPlanDiaryLogs = selectedDate
    ? planDiaryLogs.filter((log) => isDateEqual(log.createdAt, selectedDate))
    : planDiaryLogs;

  return (
    <div>
      <div>
        <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 mb-3">
          <p>Registro de Diárias</p>
          <CreatePlanDiaryLogDialog />
        </div>
        <DataTable
          columns={planDiaryColumns}
          data={filteredPlanDiaryLogs}
          noResultMsg={<SelectedDateNotResultMsg />}
        />
      </div>
    </div>
  );
}
