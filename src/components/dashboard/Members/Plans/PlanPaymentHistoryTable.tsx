import DataTable from "@/components/custom/DataTable/DataTable";
import { planPaymentColumns } from "./PlanPaymentColumnTable";
import { useMemberStore } from "@/store/memberStore";
import SubscribePlanDialog from "./SubscribePlanDialog";

export default function PlanPaymentHistoryTable() {
  const { selectedMember } = useMemberStore();

  if (!selectedMember) return null;
  const planPayments = selectedMember.planPayments;

  return (
    <div>
      <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 mb-3">
        <p>Histórico de Inscrições</p>
        <SubscribePlanDialog />
      </div>
      <DataTable
        columns={planPaymentColumns}
        data={planPayments.length > 0 ? planPayments : []}
        noResultMsg="Nenhuma inscrição encontrada"
      />
    </div>
  );
}
