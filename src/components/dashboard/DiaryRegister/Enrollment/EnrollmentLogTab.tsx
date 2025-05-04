import DataTable from "@/components/custom/DataTable/DataTable";
import { enrollmentLogColumns } from "./EnrollmentLogTableColumns";
import { useLogStore } from "@/store/logStore";
import { EnrollmentLog } from "@/types/Log.type";
import CreateEnrollmentLogDialog from "./CreateEnrollmentLogDialog";

export default function EnrollmentLogTab() {
  const { logs } = useLogStore();
  const enrollmentLogs = logs.filter(
    (log) => log.type === "enrollment"
  ) as EnrollmentLog[];

  return (
    <div>
      <p className="text-muted text-stone-500">
        Aqui você pode registrar todas as inscrições, diária e pagamentos de
        adesão.
      </p>
      <div>
        <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 mb-3">
          <p>Registro de Inscrições</p>
          <CreateEnrollmentLogDialog />
        </div>
        <DataTable
          columns={enrollmentLogColumns}
          data={enrollmentLogs}
          noResultMsg="Nenhuma registro de inscrição hoje"
        />
      </div>
    </div>
  );
}
