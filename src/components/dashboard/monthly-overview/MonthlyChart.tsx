"use client";

import { MonthData } from "@/data/MONTHS_DATA";
import { useLogStore } from "@/store/logStore";
import { useEffect, useState } from "react";
import calcProfit, { defaultProfitInfo, ProfitInfo } from "@/utils/calcProfit";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  value: {
    label: "Valor Total (R$)",
    color: "hsl(var(--chart-1))",
  },
  amount: {
    label: "Quantidade",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type MonthlyChartProps = {
  monthData: MonthData;
  year: number;
};

export default function MonthlyChart({ monthData, year }: MonthlyChartProps) {
  const { getLogsByMonth } = useLogStore();
  const [profitInfo, setProfitInfo] = useState<ProfitInfo>(defaultProfitInfo);

  // Calculate profit
  useEffect(() => {
    const logs = getLogsByMonth(monthData.value, year);
    const profit = calcProfit(logs);
    setProfitInfo(profit);
  }, [monthData.name, year]);

  const {
    profit,
    enrollment,
    purchase,
    planDiary,
    adhesion,
    expense,
    investment,
  } = profitInfo;

  const chartData = [
    { metric: "Incrições", ...enrollment },
    { metric: "Produtos", ...purchase },
    { metric: "Diárias", ...planDiary },
    { metric: "Adesões", ...adhesion },
    { metric: "Despesas", ...expense },
    { metric: "Investimentos", ...investment },
  ];

  return (
    <Card className="flex flex-col gap-3">
      {/* Chart title */}
      <CardHeader>
        <CardTitle>Gráfico de Métricas Mensal</CardTitle>
        <CardDescription>
          {monthData.name} - {year}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="metric"
              tickMargin={10}
              tickLine={true}
              axisLine={true}
              tickFormatter={(value) => value}
            />
            <YAxis
              dataKey="value"
              tickMargin={10}
              tickLine={true}
              axisLine={true}
              tickFormatter={(value) => value}
              tickCount={10}
              allowDecimals={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="value" fill="var(--color-value)" radius={4} />
            <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 ">
        <div className="flex gap-2 ">
          Lucro Total de {monthData.name}:{" "}
          <span className="font-bold">R${profit}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
