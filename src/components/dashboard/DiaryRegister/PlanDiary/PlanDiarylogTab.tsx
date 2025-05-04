import DataTable from "@/components/custom/DataTable/DataTable";
// import { planDiaryLogColumns } from "./PlanDiaryLogTableColumns";
import { useLogStore } from "@/store/logStore";
import { formatDate } from "date-fns";
import { planDiaryColumns } from "./PlanDiaryTableColumns";
import CreatePlanDiaryLogDialog from "./CreatePlanDiaryLogDialog";

export default function PlanDiaryLogTab() {
  const { selectedDate, getAllPlanDiaryLogs } = useLogStore();
  const planDiaryLogs = getAllPlanDiaryLogs();
  const filteredPlanDiaryLogs = selectedDate
    ? planDiaryLogs.filter(
        (log) =>
          formatDate(log.createdAt, "d/M/Y") ===
          formatDate(selectedDate, "d/M/Y")
      )
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
          noResultMsg="Nenhuma diária registrada hoje"
        />
      </div>
    </div>
  );
}
