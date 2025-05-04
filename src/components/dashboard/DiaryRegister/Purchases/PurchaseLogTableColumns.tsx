import DataTableSortableHeader from "@/components/custom/DataTable/DataTableSortableHeader";
import type { ColumnDef } from "@tanstack/react-table";
import type { Log, ProductPurchaseLog } from "@/types/Log.type";
import MoreOptionsDropdown from "@/components/custom/MoreOptionsDropdown";
import EditPurchaseLogDialog from "./EditPurchaseLogDialog";
import RemovePurchaseLogDialog from "./RemovePurchaseLog";
// import EditEnrollmentLogDialog from "./EditEnrollmentLogDialog";
// import RemoveEnrollmentLogDialog from "./RemoveEnrollmentLogDialog";

export const purchaseLogColumns: ColumnDef<ProductPurchaseLog>[] = [
  {
    id: "name",
    accessorKey: "member.name",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Membro" />
    ),
  },
  {
    accessorKey: "purchase.product.name",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Produto" />
    ),
  },
  {
    accessorKey: "purchase.amount",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Quantidade"
        type="numeral"
      />
    ),
  },
  {
    id: "total",
    // accessorKey: "purchase.createdAt",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Total (R$)"
        type="numeral"
      />
    ),
    cell: ({ row }) => {
      const { purchase } = row.original;
      return <p>{(purchase.product.price * purchase.amount).toFixed(2)}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const purchaseLog = row.original as Log & { type: "product-purchase" };

      return (
        <MoreOptionsDropdown>
          <div className="flex flex-col gap-1">
            <EditPurchaseLogDialog purchaseLog={purchaseLog} />
            <RemovePurchaseLogDialog purchaseLog={purchaseLog} />
          </div>
        </MoreOptionsDropdown>
      );
    },
  },
];
