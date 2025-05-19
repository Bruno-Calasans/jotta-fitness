import DataTableSortableHeader from "@/components/custom/data-table/DataTableSortableHeader";
import type { Investment } from "@/types/Investment.type";
import type { ColumnDef } from "@tanstack/react-table";
import EditInvestmentDialog from "./EditInvestmentDialog";
import MoreOptionsDropdown from "@/components/custom/data-table/MoreOptionsDropdown";
import RemoveInvestmentDialog from "./RemoveInvestmentDialog";
import defaultDateFormat from "@/utils/defaultDateFormat";

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
      return <p>{defaultDateFormat(investment.createdAt)}</p>;
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
      return <p>{defaultDateFormat(investment.updatedAt)}</p>;
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
