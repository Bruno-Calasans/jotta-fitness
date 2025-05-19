"use client";

import ContentContainer from "@/components/custom/others/ContentContainer";
import MonthSelector from "@/components/dashboard/monthly-overview/MonthSelector";
import MonthlyChart from "@/components/dashboard/monthly-overview/MonthlyChart";
import { MONTHS } from "@/data/MONTHS_DATA";
import { useState } from "react";

export default function MonthlyOverviewPage() {
  const [monthData, setMonthData] = useState(MONTHS[0]);

  return (
    <ContentContainer>
      <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 flex-row">
        <p>Resumo Mensal</p>
        <MonthSelector onItemSelected={setMonthData} />
      </div>
      <MonthlyChart monthData={monthData} />
    </ContentContainer>
  );
}
