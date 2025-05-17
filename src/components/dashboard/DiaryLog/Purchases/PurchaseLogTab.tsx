import DataTable from "@/components/custom/DataTable/DataTable";
import { useLogStore } from "@/store/logStore";
import CreatePurchaseLogDialog from "./CreatePurchaseLogDialog";
import { purchaseLogColumns } from "./PurchaseLogTableColumns";
import isDateEqual from "@/utils/isDateEquals";
import SelectedDateNotResultMsg from "../SelectedDateNotResultMsg";

export default function PurchaseLogTab() {
  const { loading, selectedDate, getAllPurchaseLogs } = useLogStore();
  const purchaseLogs = getAllPurchaseLogs();
  const filteredPurchaseLogs = selectedDate
    ? purchaseLogs.filter((log) => isDateEqual(log.createdAt, selectedDate))
    : purchaseLogs;

  return (
    <div>
      <div>
        <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 mb-3">
          <p>Registro de Compras</p>
          <CreatePurchaseLogDialog />
        </div>
        <DataTable
          loading={loading}
          loadingMsg="Carregando registros de compra"
          columns={purchaseLogColumns}
          data={filteredPurchaseLogs}
          noResultMsg={<SelectedDateNotResultMsg />}
        />
      </div>
    </div>
  );
}
