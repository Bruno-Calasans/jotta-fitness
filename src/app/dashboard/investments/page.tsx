"use client";

import DataTable from "@/components/custom/data-table/DataTable";
import ContentContainer from "@/components/custom/others/ContentContainer";
import { useInvestmentStore } from "@/store/investmentStore";
import CreateInvestmentDialog from "@/components/dashboard/investments/CreateInvestmentDialog";
import { investmentColumns } from "@/components/dashboard/investments/InvestmentTableColumns";

export default function DashboardInvestments() {
  const { loading, investments } = useInvestmentStore();

  return (
    <ContentContainer>
      <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2">
        <p>Investimentos</p>
        <CreateInvestmentDialog />
      </div>

      <DataTable
        loading={loading}
        loadingMsg="Carregando Investimentos"
        columns={investmentColumns}
        data={investments}
        noResultMsg="Nenhum investimento encontrada"
      />
    </ContentContainer>
  );
}
