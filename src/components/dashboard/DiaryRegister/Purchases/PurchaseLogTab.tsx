import DataTable from "@/components/custom/DataTable/DataTable";
import { useLogStore } from "@/store/logStore";
import CreatePurchaseLogDialog from "./CreatePurchaseLogDialog";
import { formatDate } from "date-fns";
import { purchaseLogColumns } from "./PurchaseLogTableColumns";

export default function PurchaseLogTab() {
  const { selectedDate, getAllPurchaseLogs } = useLogStore();
  const purchaseLogs = getAllPurchaseLogs();
  const filteredPurchaseLogs = selectedDate
    ? purchaseLogs.filter(
        (log) =>
          formatDate(log.createdAt, "d/M/Y") ===
          formatDate(selectedDate, "d/M/Y")
      )
    : purchaseLogs;

  console.log(filteredPurchaseLogs);

  return (
    <div>
      <div>
        <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 mb-3">
          <p>Registro de Compras</p>
          <CreatePurchaseLogDialog />
        </div>
        <DataTable
          columns={purchaseLogColumns}
          data={filteredPurchaseLogs}
          noResultMsg="Nenhuma registro de compra hoje"
        />
      </div>
    </div>
  );
}
