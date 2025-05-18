"use client";

import DataTable from "@/components/custom/dataTable/DataTable";
import { enrollmentLogColumns } from "./EnrollmentLogTableColumns";
import { useLogStore } from "@/store/logStore";
import CreateEnrollmentLogDialog from "./CreateEnrollmentLogDialog";
import isDateEqual from "@/utils/isDateEquals";
import SelectedDateNotResultMsg from "../SelectedDateNotResultMsg";

export default function EnrollmentLogTab() {
  const { selectedDate, loading, getAllEnrollmentLogs } = useLogStore();

  const enrollmentLogs = getAllEnrollmentLogs();
  const filteredEnrollmentLogs = selectedDate
    ? enrollmentLogs.filter((log) => isDateEqual(log.createdAt, selectedDate))
    : enrollmentLogs;

  return (
    <div>
      <div>
        <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 mb-3">
          <p>Registro de Inscrições</p>
          <CreateEnrollmentLogDialog />
        </div>
        <DataTable
          loading={loading}
          loadingMsg="Carregando registros de inscrição"
          columns={enrollmentLogColumns}
          data={filteredEnrollmentLogs}
          noResultMsg={<SelectedDateNotResultMsg />}
        />
      </div>
    </div>
  );
}
