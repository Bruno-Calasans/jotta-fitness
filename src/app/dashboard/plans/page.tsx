"use client";

import DataTable from "@/components/custom/DataTable/DataTable";
import ContentContainer from "@/components/general/ContentContainer";
import {
  PlanRowActionFn,
  createColumns,
} from "@/components/dashboard/Plans/PlansTableColumns";
import CreatePlanDialog from "@/components/dashboard/Plans/CreatePlanDialog";
import { usePlanStore } from "@/store/planStore";

type DashboardPlansProps = {};

export default function DashboardPlans({}: DashboardPlansProps) {
  const { plans } = usePlanStore();

  const planRowActionHandler: PlanRowActionFn = (action, plan) => {};

  return (
    <ContentContainer>
      <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2">
        <p>Planos</p>
        <CreatePlanDialog />
      </div>

      <DataTable columns={createColumns(planRowActionHandler)} data={plans} />
    </ContentContainer>
  );
}
