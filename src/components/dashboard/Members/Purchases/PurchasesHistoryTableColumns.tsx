import DataTableSortableHeader from "@/components/custom/DataTable/DataTableSortableHeader";
import type { ColumnDef } from "@tanstack/react-table";
import MoreOptionsDropdown from "@/components/custom/MoreOptionsDropdown";
import { Purchase } from "@/types/Purchase.type";
import EditPurchaseDialog from "./EditPurchaseDialog";
import RemovePurchaseDialog from "./RemovePurchaseDialog";

export const purchasesColumns: ColumnDef<Purchase>[] = [
  {
    id: "name",
    accessorKey: "product.name",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Produto" />
    ),
  },
  {
    accessorKey: "product.price",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Preço (R$)"
        type="numeral"
      />
    ),
  },
  {
    accessorKey: "amount",
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
    accessorKey: "product.price",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Total (R$)"
        type="numeral"
      />
    ),
    cell: ({ row }) => {
      const { product, amount } = row.original;
      return <p>{(product.price * amount).toFixed(2)}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Data de Compra"
        type="date"
      />
    ),
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return <p>{createdAt.toLocaleDateString()}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const purchase = row.original;

      return (
        <MoreOptionsDropdown>
          <div className="flex flex-col gap-1">
            <EditPurchaseDialog purchase={purchase} />
            <RemovePurchaseDialog purchase={purchase} />
          </div>
        </MoreOptionsDropdown>
      );
    },
  },
];
