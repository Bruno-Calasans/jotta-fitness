import DataTable from "@/components/custom/dataTable/DataTable";
import { useLogStore } from "@/store/logStore";
import { planDiaryColumns } from "./PlanDiaryTableColumns";
import CreatePlanDiaryLogDialog from "./CreatePlanDiaryLogDialog";
import SelectedDateNotResultMsg from "../SelectedDateNotResultMsg";
import { useEffect, useState } from "react";
import { PlanDiaryLog } from "@/types/Log.type";

export default function PlanDiaryLogTab() {
  const { loading, selectedDate, getLogsByDate } = useLogStore();
  const [planDiaryLogs, setPlanDiaryLogs] = useState<PlanDiaryLog[]>([]);

  useEffect(() => {
    if (selectedDate) {
      const logs = getLogsByDate(selectedDate, [
        "plan-diary",
      ]) as PlanDiaryLog[];
      setPlanDiaryLogs(logs);
    }
  }, [selectedDate]);

  return (
    <div>
      <div>
        <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 mb-3">
          <p>Registro de Diárias</p>
          <CreatePlanDiaryLogDialog />
        </div>
        <DataTable
          loading={loading}
          loadingMsg="Carregando registros de diária"
          columns={planDiaryColumns}
          data={planDiaryLogs}
          noResultMsg={<SelectedDateNotResultMsg />}
        />
      </div>
    </div>
  );
}
