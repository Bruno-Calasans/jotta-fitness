"use client";

import DataTable from "@/components/custom/DataTable/DataTable";
import ContentContainer from "@/components/general/ContentContainer";
import { useExpenseStore } from "@/store/expenseStore";
import CreateExpenseDialog from "@/components/dashboard/Expenses/CreateExpenseDialog";
import { expenseColumns } from "@/components/dashboard/Expenses/ExpenseTableColumns";

export default function DashboardExpenses() {
  const { loading, expenses } = useExpenseStore();

  return (
    <ContentContainer>
      <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2">
        <p>Despesas</p>
        <CreateExpenseDialog />
      </div>

      <DataTable
        loading={loading}
        loadingMsg="Carregando despesas"
        columns={expenseColumns}
        data={expenses}
        noResultMsg="Nenhuma despesa encontrada"
      />
    </ContentContainer>
  );
}
