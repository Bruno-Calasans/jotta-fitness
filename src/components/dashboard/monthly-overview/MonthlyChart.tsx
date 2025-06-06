"use client";

import { MonthData } from "@/data/MONTHS_DATA";
import { useLogStore } from "@/store/logStore";
import { useEffect, useState } from "react";
import calcProfit, { defaultProfitInfo, ProfitInfo } from "@/utils/calcProfit";
import MetricChart from "./MetricChart";
import groupBy from "@/utils/groupBy";
import groupPurchases from "@/utils/groupPurchases";
import createPurchase from "@/utils/createPurchase";
import { PRODUCTS_DATA } from "@/data/PRODUCTS_DATA";
import getDeepestKey from "@/utils/getDeepestKey";

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

  const purchases = [createPurchase({ amount: 10, product: PRODUCTS_DATA[0] })];
  groupPurchases(purchases);
  // console.log("test", getDeepestKey(purchases[0], ["product", "name"]));

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
