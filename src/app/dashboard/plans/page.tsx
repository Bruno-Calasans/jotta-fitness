"use client";

import DataTable from "@/components/custom/DataTable/DataTable";
import ContentContainer from "@/components/general/ContentContainer";
import { planColumns } from "@/components/dashboard/Plans/PlansTableColumns";
import { usePlanStore } from "@/store/planStore";
import CreatePlanDialog from "@/components/dashboard/Plans/CreatePlanDialog";

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
