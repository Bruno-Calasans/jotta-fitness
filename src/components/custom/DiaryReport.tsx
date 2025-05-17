import { useLogStore } from "@/store/logStore";
import ReportInfo from "./ReportInfo";
import toRealFormat from "@/utils/toRealFormat";

export default function DiaryReport() {
  const {
    sumAllPurchasesLogsByDate,
    sumAllEnrollmentLogsByDate,
    sumAllPlanDiaryLogsByDate,
    sumAllAdhesionLogsByDate,
    sumAllLossLogsByDate,
  } = useLogStore();

  const currentDate = new Date();
  const purchaseIncome = sumAllPurchasesLogsByDate(currentDate);
  const enrollmentIncome = sumAllEnrollmentLogsByDate(currentDate);
  const planDiaryIncome = sumAllPlanDiaryLogsByDate(currentDate);
  const adhesionIncome = sumAllAdhesionLogsByDate(currentDate);
  const { expenseLoss, investmentLoss } = sumAllLossLogsByDate(currentDate);

  const profit =
    purchaseIncome +
    enrollmentIncome +
    planDiaryIncome +
    adhesionIncome -
    investmentLoss -
    expenseLoss;

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
      {/* Gain */}
      <div className="flex gap-2">
        {/* Product Info */}
        <ReportInfo
          title="Compras"
          subtitle={toRealFormat(purchaseIncome)}
          classnames={{
            container: "border-indigo-500",
            title: "text-indigo-500",
            subtitle: "text-indigo-100",
          }}
        />

        {/* Enrollments */}
        <ReportInfo
          title="Inscrições"
          subtitle={toRealFormat(enrollmentIncome)}
          classnames={{
            container: "border-indigo-500",
            title: "text-indigo-500",
            subtitle: "text-indigo-100",
          }}
        />

        {/* Plan Diaries */}
        <ReportInfo
          title="Diárias"
          subtitle={toRealFormat(planDiaryIncome)}
          classnames={{
            container: "border-indigo-500",
            title: "text-indigo-500",
            subtitle: "text-indigo-100",
          }}
        />

        {/* Adhesions */}
        <ReportInfo
          title="Adesões"
          subtitle={toRealFormat(adhesionIncome)}
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
          subtitle={toRealFormat(investmentLoss)}
          classnames={{
            container: "border-orange-500",
            title: "text-orange-500",
            subtitle: "text-orange-100",
          }}
        />

        {/* Losses */}
        <ReportInfo
          title="Despesas"
          subtitle={toRealFormat(expenseLoss)}
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
