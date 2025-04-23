import DataTableSortableHeader from "@/components/custom/DataTable/DataTableSortableHeader";
import type { ColumnDef } from "@tanstack/react-table";
import MoreOptionsDropdown from "@/components/custom/MoreOptionsDropdown";
import { Adhesion } from "@/types/Adhesion.type";
import { format } from "date-fns";
import RemoveAdhesionDialog from "./RemoveAdhesionDialog";
import EditAdhesionDialog from "./EditAdhesionDialog";

export const adhesionColumns: ColumnDef<Adhesion>[] = [
  {
    accessorKey: "year",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Ano"
        type="numeral"
      />
    ),
  },
  // {
  //   accessorKey: "price",
  //   header: ({ column }) => (
  //     <DataTableSortableHeader
  //       column={column}
  //       headerName="Preço (R$)"
  //       type="numeral"
  //     />
  //   ),
  // },
  {
    accessorKey: "newbieDiscount",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Desconto (novatos) %"
        type="numeral"
      />
    ),
  },
  {
    accessorKey: "veteranDiscount",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Desconto (veteranos) %"
        type="numeral"
      />
    ),
  },
  {
    accessorKey: "discountMaxDate",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Desconto até"
        type="date"
      />
    ),
    cell: ({ row }) => {
      const adhesion = row.original;
      return <p>{format(adhesion.discountMaxDate, "d/M//Y")}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const adhesion = row.original;

      return (
        <MoreOptionsDropdown>
          <div className="flex flex-col gap-1">
            <EditAdhesionDialog adhesion={adhesion} />
            <RemoveAdhesionDialog adhesion={adhesion} />
          </div>
        </MoreOptionsDropdown>
      );
    },
  },
];
