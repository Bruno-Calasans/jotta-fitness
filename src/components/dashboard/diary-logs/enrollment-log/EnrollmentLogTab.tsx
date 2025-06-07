"use client";

import DataTable from "@/components/custom/data-table/DataTable";
import { enrollmentLogColumns } from "./EnrollmentLogTableColumns";
import { useLogStore } from "@/store/logStore";
import CreateEnrollmentLogDialog from "./CreateEnrollmentLogDialog";
import SelectedDateNotResultMsg from "../SelectedDateNotResultMsg";
import { useEffect, useState } from "react";
import type { EnrollmentLog } from "@/types/Log.type";

export default function EnrollmentLogTab() {
  const { selectedDate, loading, getLogsByDate } = useLogStore();
  // const [enrollmentLogs, setEnrollmentLogs] = useState<EnrollmentLog[]>([]);

  // useEffect(() => {
  //   if (selectedDate) {
  //     const logs = getLogsByDate(selectedDate, [
  //       "enrollment",
  //     ]) as EnrollmentLog[];
  //     setEnrollmentLogs(logs);
  //   }
  // }, [selectedDate]);

  const enrollmentLogs = getLogsByDate(selectedDate || new Date(), [
    "enrollment",
  ]) as EnrollmentLog[];

  return (
    <div>
      <div>
        <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 mb-3">
          <p>Registro de Inscrições</p>
          <CreateEnrollmentLogDialog />
        </div>
        <DataTable
          loading={loading}
          columns={enrollmentLogColumns}
          data={enrollmentLogs}
          noResultMsg={<SelectedDateNotResultMsg />}
          loadingMsg="Carregando registros de inscrição"
          inputSearchPlaceholder="Procurar registro de inscrição"
        />
      </div>
    </div>
  );
}
