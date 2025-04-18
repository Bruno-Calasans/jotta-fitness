import DataTableSortableHeader from "@/components/custom/DataTable/DataTableSortableHeader";
import type { Investment } from "@/types/Investment.type";
import type { ColumnDef } from "@tanstack/react-table";
import EditInvestmentDialog from "./EditInvestmentDialog";
import MoreOptionsDropdown from "@/components/custom/MoreOptionsDropdown";
import RemoveInvestmentDialog from "./RemoveInvestmentDialog";

export const investmentColumns: ColumnDef<Investment>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Nome" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Data de Criação"
        type="date"
      />
    ),
    cell: ({ row }) => {
      const investment = row.original;
      return (
        <p>
          {`${investment.createdAt.toLocaleDateString()} às ${investment.createdAt.toLocaleTimeString()}`}
        </p>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Data de Atualização"
        type="date"
      />
    ),
    cell: ({ row }) => {
      const investment = row.original;
      return (
        <p>
          {`${investment.updatedAt.toLocaleDateString()} às ${investment.updatedAt.toLocaleTimeString()}`}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const investment = row.original;

      return (
        <MoreOptionsDropdown>
          <div className="flex flex-col gap-1">
            <EditInvestmentDialog investment={investment} />
            <RemoveInvestmentDialog investment={investment} />
          </div>
        </MoreOptionsDropdown>
      );
    },
  },
];
