"use client";

import DataTable from "@/components/custom/DataTable/DataTable";
import ContentContainer from "@/components/general/ContentContainer";
import { useInvestmentStore } from "@/store/investmentStore";
import CreateInvestmentDialog from "@/components/dashboard/Investments/CreateInvestmentDialog";
import { investmentColumns } from "@/components/dashboard/Investments/InvestmentTableColumns";

export default function DashboardInvestments() {
  const { investments } = useInvestmentStore();

  return (
    <ContentContainer>
      <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2">
        <p>Investimentos</p>
        <CreateInvestmentDialog />
      </div>

      <DataTable
        columns={investmentColumns}
        data={investments}
        noResultMsg="Nenhum investimento encontrada"
      />
    </ContentContainer>
  );
}
