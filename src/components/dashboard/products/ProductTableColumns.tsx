import DataTableSortableHeader from "@/components/custom/data-table/DataTableSortableHeader";
import type { Product } from "@/types/Product.type";
import type { ColumnDef } from "@tanstack/react-table";
import EditProductDialog from "./EditProductDialog";
import MoreOptionsDropdown from "@/components/custom/data-table/MoreOptionsDropdown";
import RemoveProductDialog from "./RemoveProductDialog";
import classifyProductStatus from "@/utils/classifyProductStatus";
import ProductStatus from "./ProductStatus";
import EditProductExpireAmountDialog from "./EditProductExpireAmountDialog";

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Nome" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Preço (R$)"
        type="numeral"
      />
    ),
  },
  {
    accessorKey: "expiredAmount",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Expirados"
        type="numeral"
      />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Disponíveis"
        type="numeral"
      />
    ),
  },
  {
    id: "productStatus",
    accessorFn: (product) => classifyProductStatus(product),
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Status"
        type="numeral"
      />
    ),
    cell: ({ row }) => {
      const product = row.original;
      return <ProductStatus product={product} />;
    },
    sortDescFirst: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <MoreOptionsDropdown>
          <div className="flex flex-col gap-1">
            <EditProductDialog product={product} />
            {product.amount > 0 && (
              <EditProductExpireAmountDialog product={product} />
            )}
            <RemoveProductDialog product={product} />
          </div>
        </MoreOptionsDropdown>
      );
    },
  },
];
