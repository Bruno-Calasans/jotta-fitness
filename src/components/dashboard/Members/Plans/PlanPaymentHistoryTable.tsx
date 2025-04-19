import DataTable from "@/components/custom/DataTable/DataTable";
import { Member } from "@/types/Member.type";
import { planPaymentColumns } from "./PlanPaymentColumnTable";

type PlanPaymentHistoryTableProps = {
  member: Member;
};

export default function PlanPaymentHistoryTable({
  member,
}: PlanPaymentHistoryTableProps) {
  return (
    <DataTable
      columns={planPaymentColumns}
      data={
        member.payments && member.payments.plans.length > 0
          ? member.payments.plans
          : []
      }
      noResultMsg="Nenhum pagamento encontrado"
    />
  );
}
