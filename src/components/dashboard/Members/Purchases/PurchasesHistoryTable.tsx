"use client";

import DataTable from "@/components/custom/DataTable/DataTable";
import { purchasesColumns } from "./PurchasesHistoryTableColumns";
import { useMemberStore } from "@/store/memberStore";
import CreatePurchaseDialog from "./CreatePurchaseDialog";

export default function PurchasesHistoryTable() {
  const { loading, selectedMember } = useMemberStore();

  if (!selectedMember) return null;

  const purchases = selectedMember.purchases;

  return (
    <div>
      <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 mb-3">
        <p>Histórico de Compras</p>
        <CreatePurchaseDialog />
      </div>
      <DataTable
        loading={loading}
        loadingMsg="Carregando compras"
        columns={purchasesColumns}
        data={purchases.length > 0 ? purchases : []}
        noResultMsg="Nenhuma compra encontrada"
      />
    </div>
  );
}
