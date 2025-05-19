"use client";

import DataTable from "@/components/custom/data-table/DataTable";
import ContentContainer from "@/components/custom/others/ContentContainer";
import { planColumns } from "@/components/dashboard/plans/PlansTableColumns";
import { usePlanStore } from "@/store/planStore";
import CreatePlanDialog from "@/components/dashboard/plans/CreatePlanDialog";

export default function DashboardPlans() {
  const { loading, plans } = usePlanStore();

  return (
    <ContentContainer>
      <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2">
        <p>Planos</p>
        <CreatePlanDialog />
      </div>

      <DataTable
        loading={loading}
        loadingMsg="Carregando planos"
        columns={planColumns}
        data={plans}
        noResultMsg="Nenhum plano encontrado"
      />
    </ContentContainer>
  );
}
