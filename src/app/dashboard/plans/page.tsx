"use client";

import DataTable from "@/components/custom/DataTable/DataTable";
import ContentContainer from "@/components/general/ContentContainer";
import { DATA_PLANS } from "@/data/DATA_PLANS";
import { PLAN_COLUMNS } from "@/components/dashboard/Plans/PlansTableColumns";

type DashboardPlansProps = {};


export default function DashboardPlans({}: DashboardPlansProps) {
  return (
    <ContentContainer>
      <div className="text-4xl border-b-2 border-b-orange-500">Planos</div>
      <DataTable columns={PLAN_COLUMNS} data={DATA_PLANS} />
    </ContentContainer>
  );
}
