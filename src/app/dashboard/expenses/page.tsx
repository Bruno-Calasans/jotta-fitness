"use client";

import DataTable from "@/components/custom/data-table/DataTable";
import ContentContainer from "@/components/custom/others/ContentContainer";
import { useExpenseStore } from "@/store/expenseStore";
import CreateExpenseDialog from "@/components/dashboard/expenses/CreateExpenseDialog";
import { expenseColumns } from "@/components/dashboard/expenses/ExpenseTableColumns";

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
