import DataTableSortableHeader from "@/components/custom/DataTable/DataTableSortableHeader";
import type { Expense } from "@/types/Expense.type";
import type { ColumnDef } from "@tanstack/react-table";
import EditExpenseDialog from "./EditExpenseDialog";
import MoreOptionsDropdown from "@/components/custom/MoreOptionsDropdown";
import RemoveExpenseDialog from "./RemoveExpenseDialog";

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
      return (
        <p>
          {`${expense.createdAt.toLocaleDateString()} às ${expense.createdAt.toLocaleTimeString()}`}
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
      const expense = row.original;
      return (
        <p>
          {`${expense.updatedAt.toLocaleDateString()} às ${expense.updatedAt.toLocaleTimeString()}`}
        </p>
      );
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
