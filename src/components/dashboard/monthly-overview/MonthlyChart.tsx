"use client";

import { MonthData } from "@/data/MONTHS_DATA";
import { useLogStore } from "@/store/logStore";
import { useEffect, useState } from "react";
import calcProfit, { defaultProfitInfo, ProfitInfo } from "@/utils/calcProfit";
import MetricChart from "./MetricChart";

type MonthlyChartProps = {
  monthData: MonthData;
};

export default function MonthlyChart({ monthData }: MonthlyChartProps) {
  const { getLogsByMonth } = useLogStore();
  const [profitInfo, setProfitInfo] = useState<ProfitInfo>(defaultProfitInfo);

  useEffect(() => {
    const logs = getLogsByMonth(monthData.value);
    const profit = calcProfit(logs);
    setProfitInfo(profit);
  }, [monthData.name]);

  return (
    <div className="flex flex-col gap-3">
      <MetricChart
        data={{
          monthData,
          profitInfo,
        }}
      />
    </div>
  );
}
