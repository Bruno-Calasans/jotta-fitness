import { enrollmentColumns } from "./EnrollmentHistoryTableColumns";
import { useMemberStore } from "@/store/memberStore";
import DataTable from "@/components/custom/data-table/DataTable";
import CreateSubscriptionDialog from "./CreateEnrollmentDialog";

export default function EnrollmentsHistoryTable() {
  const { loading, selectedMember } = useMemberStore();

  if (!selectedMember) return null;

  const enrollments = selectedMember.enrollments;

  return (
    <div>
      <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 mb-3">
        <p>Histórico de Inscrições</p>
        <CreateSubscriptionDialog />
      </div>
      <DataTable
        loading={loading}
        columns={enrollmentColumns}
        data={enrollments}
        columnNameFilter="planName"
        noResultMsg="Nenhuma inscrição encontrada"
        inputSearchPlaceholder="Procurar inscrição"
        loadingMsg="Carregando inscrições"
      />
    </div>
  );
}
