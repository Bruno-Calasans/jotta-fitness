"use client";

import ContentContainer from "@/components/custom/others/ContentContainer";
import MonthlyChart from "@/components/dashboard/monthly-overview/MonthlyChart";

export default function MonthlyOverviewPage() {
  return (
    <ContentContainer>
      <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 flex-row">
        <p>Resumo Mensal</p>
      </div>
      <MonthlyChart />
    </ContentContainer>
  );
}
