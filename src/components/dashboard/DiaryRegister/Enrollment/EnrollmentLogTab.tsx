import DataTable from "@/components/custom/DataTable/DataTable";
import { enrollmentLogColumns } from "./EnrollmentLogTableColumns";
import { useLogStore } from "@/store/logStore";
import CreateEnrollmentLogDialog from "./CreateEnrollmentLogDialog";
import { formatDate } from "date-fns";
import isDateEqual from "@/utils/isDateEquals";

export default function EnrollmentLogTab() {
  const { selectedDate, getAllEnrollmentLogs } = useLogStore();

  const enrollmentLogs = getAllEnrollmentLogs();
  const filteredEnrollmentLogs = selectedDate
    ? enrollmentLogs.filter((log) => isDateEqual(log.createdAt, selectedDate))
    : enrollmentLogs;

  const createNoResultMsg = () => {
    if (!selectedDate) return <p>Selecione uma data</p>;

    const isToday = isDateEqual(selectedDate, new Date());
    if (isToday) return <p>Nenhum registro para hoje</p>;

    return <p>Nenhum registro para data {formatDate(selectedDate, "d/M/Y")}</p>;
  };

  return (
    <div>
      {/* <p className="text-muted text-stone-500">
        Aqui você pode registrar todas as inscrições de hoje.
      </p> */}
      <div>
        <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 mb-3">
          <p>Registro de Inscrições</p>
          <CreateEnrollmentLogDialog />
        </div>
        <DataTable
          columns={enrollmentLogColumns}
          data={filteredEnrollmentLogs}
          noResultMsg={createNoResultMsg()}
        />
      </div>
    </div>
  );
}
