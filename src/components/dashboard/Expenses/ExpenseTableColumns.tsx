import DataTableSortableHeader from "@/components/custom/dataTable/DataTableSortableHeader";
import type { Expense } from "@/types/Expense.type";
import type { ColumnDef } from "@tanstack/react-table";
import EditExpenseDialog from "./EditExpenseDialog";
import MoreOptionsDropdown from "@/components/custom/dataTable/MoreOptionsDropdown";
import RemoveExpenseDialog from "./RemoveExpenseDialog";
import defaultDateFormat from "@/utils/defaultDateFormat";

export const expenseColumns: ColumnDef<Expense>[] = [
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
      const expense = row.original;
      return <p>{defaultDateFormat(expense.createdAt)}</p>;
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
      const expense = row.original;
      return <p>{defaultDateFormat(expense.updatedAt)}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const expense = row.original;

      return (
        <MoreOptionsDropdown>
          <div className="flex flex-col gap-1">
            <EditExpenseDialog expense={expense} />
            <RemoveExpenseDialog expense={expense} />
          </div>
        </MoreOptionsDropdown>
      );
    },
  },
];
