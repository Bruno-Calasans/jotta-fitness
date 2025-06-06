import DataTableSortableHeader from "@/components/custom/data-table/DataTableSortableHeader";
import type { ColumnDef } from "@tanstack/react-table";
import MoreOptionsDropdown from "@/components/custom/data-table/MoreOptionsDropdown";
import { Adhesion } from "@/types/Adhesion.type";
import RemoveAdhesionDialog from "./RemoveAdhesionDialog";
import EditAdhesionDialog from "./EditAdhesionDialog";
import defaultDateFormat from "@/utils/defaultDateFormat";

export const adhesionColumns: ColumnDef<Adhesion>[] = [
  {
    id: "year",
    // accessorKey: "year",
    accessorFn: (adhesion) => String(adhesion.year),
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Ano"
        type="numeral"
      />
    ),
  },
  {
    accessorKey: "newbieDiscount",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Desconto em % (novatos)"
        type="numeral"
      />
    ),
  },
  {
    accessorKey: "veteranDiscount",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Desconto em % (veteranos)"
        type="numeral"
      />
    ),
  },
  {
    accessorKey: "discountMaxDate",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Válida até"
        type="date"
      />
    ),
    cell: ({ row }) => {
      const adhesion = row.original;
      return <p>{defaultDateFormat(adhesion.discountMaxDate)}</p>;
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
