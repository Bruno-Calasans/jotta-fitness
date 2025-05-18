import { enrollmentColumns } from "./EnrollmentHistoryTableColumns";
import { useMemberStore } from "@/store/memberStore";
import { useLogStore } from "@/store/logStore";
import DataTable from "@/components/custom/dataTable/DataTable";
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
        loadingMsg="Carregando inscrições"
        columns={enrollmentColumns}
        data={enrollments.length > 0 ? enrollments : []}
        noResultMsg="Nenhuma inscrição encontrada"
      />
    </div>
  );
}
