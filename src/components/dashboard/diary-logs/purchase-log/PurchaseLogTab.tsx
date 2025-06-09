import DataTable from "@/components/custom/data-table/DataTable";
import { useLogStore } from "@/store/logStore";
import CreatePurchaseLogDialog from "./CreatePurchaseLogDialog";
import { purchaseLogColumns } from "./PurchaseLogTableColumns";
import SelectedDateNotResultMsg from "../SelectedDateNotResultMsg";
import { useEffect, useState } from "react";
import type { PurchaseLog } from "@/types/Log.type";

export default function PurchaseLogTab() {
  const { loading, selectedDate, getLogsByDate } = useLogStore();
  // const [purchaseLogs, setPurchaseLogs] = useState<PurchaseLog[]>([]);

  // useEffect(() => {
  //   if (selectedDate) {
  //     const logs = getLogsByDate(selectedDate, ["purchase"]) as PurchaseLog[];
  //     setPurchaseLogs(logs);
  //   }
  // }, [selectedDate]);

  const purchaseLogs = getLogsByDate(selectedDate || new Date(), [
    "purchase",
  ]) as PurchaseLog[];

  return (
    <div>
      <div>
        <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 mb-3">
          <p>Registro de Compras</p>
          <CreatePurchaseLogDialog />
        </div>
        <DataTable
          loading={loading}
          columns={purchaseLogColumns}
          data={purchaseLogs}
          noResultMsg={<SelectedDateNotResultMsg />}
          loadingMsg="Carregando registros de compra"
          inputSearchPlaceholder="Procurar registro de compra"
        />
      </div>
    </div>
  );
}
