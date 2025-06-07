import DataTable from "@/components/custom/data-table/DataTable";
import { useLogStore } from "@/store/logStore";
import { planDiaryColumns } from "./PlanDiaryTableColumns";
import CreatePlanDiaryLogDialog from "./CreatePlanDiaryLogDialog";
import SelectedDateNotResultMsg from "../SelectedDateNotResultMsg";
import { useEffect, useState, useMemo } from "react";
import { PlanDiaryLog } from "@/types/Log.type";

export default function PlanDiaryLogTab() {
  const { loading, selectedDate, getLogsByDate } = useLogStore();
  // const [planDiaryLogs, setPlanDiaryLogs] = useState<PlanDiaryLog[]>([]);

  const planDiaryLogs = getLogsByDate(selectedDate || new Date(), [
    "plan-diary",
  ]) as PlanDiaryLog[];

  return (
    <div>
      <div>
        <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 mb-3">
          <p>Registro de Diárias</p>
          <CreatePlanDiaryLogDialog />
        </div>
        <DataTable
          loading={loading}
          columns={planDiaryColumns}
          data={planDiaryLogs}
          noResultMsg={<SelectedDateNotResultMsg />}
          loadingMsg="Carregando registros de diária"
          inputSearchPlaceholder="Procurar registro de diária"
        />
      </div>
    </div>
  );
}
