"use client";

import { useLogStore } from "@/store/logStore";
import ReportInfo from "./ReportInfo";
import toRealFormat from "@/utils/toRealFormat";
import calcProfit, { defaultProfitInfo, ProfitInfo } from "@/utils/calcProfit";
import { useEffect, useState } from "react";

export default function DiaryReport() {
  const { selectedDate, getLogsByDate } = useLogStore();
  const [profitInfo, setProfitInfo] = useState<ProfitInfo>(defaultProfitInfo);

  useEffect(() => {
    if (selectedDate) {
      const logsByDate = getLogsByDate(selectedDate);
      setProfitInfo(calcProfit(logsByDate));
    }
  }, [selectedDate]);

  const {
    profit,
    enrollment,
    purchase,
    planDiary,
    adhesion,
    expense,
    investment,
  } = profitInfo;

  return (
    <div className="flex gap-2 flex-wrap mb-3">
      {/* Profit  */}
      <ReportInfo
        title="Lucro"
        subtitle={toRealFormat(profit)}
        classnames={{
          container: profit >= 0 ? "border-emerald-500" : "border-red-500",
          title: profit >= 0 ? "text-emerald-500" : "text-red-500",
          subtitle: profit >= 0 ? "text-emerald-200" : "text-red-200",
        }}
      />
      {/* Gains */}
      <div className="flex gap-2">
        {/* Product Info */}
        <ReportInfo
          title="Compras"
          subtitle={toRealFormat(purchase.value)}
          classnames={{
            container: "border-indigo-500",
            title: "text-indigo-500",
            subtitle: "text-indigo-100",
          }}
        />

        {/* Enrollments */}
        <ReportInfo
          title="Inscrições"
          subtitle={toRealFormat(enrollment.value)}
          classnames={{
            container: "border-indigo-500",
            title: "text-indigo-500",
            subtitle: "text-indigo-100",
          }}
        />

        {/* Plan Diaries */}
        <ReportInfo
          title="Diárias"
          subtitle={toRealFormat(planDiary.value)}
          classnames={{
            container: "border-indigo-500",
            title: "text-indigo-500",
            subtitle: "text-indigo-100",
          }}
        />

        {/* Adhesions */}
        <ReportInfo
          title="Adesões"
          subtitle={toRealFormat(adhesion.value)}
          classnames={{
            container: "border-indigo-500",
            title: "text-indigo-500",
            subtitle: "text-indigo-100",
          }}
        />
      </div>

      {/* Losses */}
      <div className="flex gap-2">
        <ReportInfo
          title="Investimentos"
          subtitle={toRealFormat(investment.value)}
          classnames={{
            container: "border-orange-500",
            title: "text-orange-500",
            subtitle: "text-orange-100",
          }}
        />

        {/* Losses */}
        <ReportInfo
          title="Despesas"
          subtitle={toRealFormat(expense.value)}
          classnames={{
            container: "border-orange-500",
            title: "text-orange-500",
            subtitle: "text-orange-100",
          }}
        />
      </div>
    </div>
  );
}
