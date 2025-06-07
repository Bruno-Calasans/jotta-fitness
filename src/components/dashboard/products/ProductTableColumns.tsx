import DataTableSortableHeader from "@/components/custom/data-table/DataTableSortableHeader";
import type { Product } from "@/types/Product.type";
import type { ColumnDef } from "@tanstack/react-table";
import EditProductDialog from "./EditProductDialog";
import MoreOptionsDropdown from "@/components/custom/data-table/MoreOptionsDropdown";
import RemoveProductDialog from "./RemoveProductDialog";
import defaultDateFormat from "@/utils/defaultDateFormat";
import classifyProductStatus from "@/utils/classifyProductStatus";
import ProductStatus from "./ProductStatus";

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
  // {
  //   accessorKey: "createdAt",
  //   header: ({ column }) => (
  //     <DataTableSortableHeader
  //       column={column}
  //       headerName="Data de Criação"
  //       type="date"
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     const product = row.original;
  //     return <p>{defaultDateFormat(product.createdAt)}</p>;
  //   },
  // },
  // {
  //   accessorKey: "updatedAt",
  //   header: ({ column }) => (
  //     <DataTableSortableHeader
  //       column={column}
  //       headerName="Data de Atualização"
  //       type="date"
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     const product = row.original;
  //     return <p>{defaultDateFormat(product.updatedAt)}</p>;
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <MoreOptionsDropdown>
          <div className="flex flex-col gap-1">
            <EditProductDialog product={product} />
            <RemoveProductDialog product={product} />
          </div>
        </MoreOptionsDropdown>
      );
    },
  },
];
