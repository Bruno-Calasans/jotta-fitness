"use client";

import ContentContainer from "@/components/custom/others/ContentContainer";
import MonthSelector from "@/components/dashboard/monthly-overview/MonthSelector";
import MonthlyChart from "@/components/dashboard/monthly-overview/MonthlyChart";
import { Input } from "@/components/ui/input";
import { MONTHS } from "@/data/MONTHS_DATA";
import { useState } from "react";

export default function MonthlyOverviewPage() {
  const [monthData, setMonthData] = useState(MONTHS[0]);
  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <ContentContainer>
      <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 flex-row">
        <p>Resumo Mensal</p>
        <div className="flex gap-2 flex-row-reverse">
          <Input
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            type="number"
            placeholder="Ano"
            className="w-20"
          />
          <MonthSelector onItemSelected={setMonthData} />
        </div>
      </div>
      <MonthlyChart monthData={monthData} year={year} />
    </ContentContainer>
  );
}
