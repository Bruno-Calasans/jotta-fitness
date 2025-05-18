import DataTableSortableHeader from "@/components/custom/dataTable/DataTableSortableHeader";
import type { ColumnDef } from "@tanstack/react-table";
import type { Log, PurchaseLog } from "@/types/Log.type";
import MoreOptionsDropdown from "@/components/custom/dataTable/MoreOptionsDropdown";
import EditPurchaseLogDialog from "./EditPurchaseLogDialog";
import RemovePurchaseLogDialog from "./RemovePurchaseLog";

export const purchaseLogColumns: ColumnDef<PurchaseLog>[] = [
  {
    id: "name",
    accessorKey: "member.name",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Membro" />
    ),
    cell: ({ row }) => {
      const { member } = row.original;
      return <p>{member ? member.name : "Não cadastrado"}</p>;
    },
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
