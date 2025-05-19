import DataTableSortableHeader from "@/components/custom/data-table/DataTableSortableHeader";
import type { ColumnDef } from "@tanstack/react-table";
import type { AdhesionLog } from "@/types/Log.type";
import MoreOptionsDropdown from "@/components/custom/data-table/MoreOptionsDropdown";
import RemoveAdhesionLogDialog from "./RemoveAdhesionLogDialog";

export const adhesionLogColumns: ColumnDef<AdhesionLog>[] = [
  {
    id: "name",
    accessorKey: "member.name",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Membro" />
    ),
  },
  {
    accessorKey: "plan.name",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Plano" />
    ),
  },
  {
    accessorKey: "adhesion.year",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Ano da Adesão"
        type="numeral"
      />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Valor Pago (R$)"
        type="numeral"
      />
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const adhesionLog = row.original;

      return (
        <MoreOptionsDropdown>
          <div className="flex flex-col gap-1">
            {/* <EditAdhesionLogDialog adhesionLog={adhesionLog} /> */}
            <RemoveAdhesionLogDialog adhesionLog={adhesionLog} />
          </div>
        </MoreOptionsDropdown>
      );
    },
  },
];
