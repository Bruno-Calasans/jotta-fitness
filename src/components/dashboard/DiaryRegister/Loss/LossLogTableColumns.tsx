import DataTableSortableHeader from "@/components/custom/DataTable/DataTableSortableHeader";
import type { ColumnDef } from "@tanstack/react-table";
import type { Log, LossLog } from "@/types/Log.type";
import MoreOptionsDropdown from "@/components/custom/MoreOptionsDropdown";
import EditLossLogDialog from "./EditLossLogDialog";
import RemoveLossLogDialog from "./RemoveLossLogDialog";

export const lossLogColumns: ColumnDef<LossLog>[] = [
  {
    id: "name",
    accessorKey: "item.name",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Nome" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Tipo" />
    ),
    cell: ({ row }) => {
      const lossLog = row.original;
      return <p>{lossLog.type === "expense" ? "Despesa" : "Investimento"}</p>;
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Valor (R$)"
        type="numeral"
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const lossLog = row.original as Log & { type: "expense" | "investment" };

      return (
        <MoreOptionsDropdown>
          <div className="flex flex-col gap-1">
            <EditLossLogDialog lossLog={lossLog} />
            <RemoveLossLogDialog lossLog={lossLog} />
          </div>
        </MoreOptionsDropdown>
      );
    },
  },
];
