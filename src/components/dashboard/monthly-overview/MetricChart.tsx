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
import { ProfitInfo } from "@/utils/calcProfit";
import { MonthData } from "@/data/MONTHS_DATA";

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

type MetricChartProps = {
  data: {
    monthData: MonthData;
    profitInfo: ProfitInfo;
  };
};

export default function MetricChart({
  data: { monthData, profitInfo },
}: MetricChartProps) {
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
    <Card>
      <CardHeader>
        <CardTitle>Gráfico de Métricas Mensal</CardTitle>
        <CardDescription>{monthData.name} - 2025</CardDescription>
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
              allowDecimals={false}
              tickCount={10}
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
