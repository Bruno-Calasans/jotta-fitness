import DataTableRowActions from "@/components/custom/DataTable/DataTableRowActions";
import DataTableSortableHeader from "@/components/custom/DataTable/DataTableSortableHeader";
import type { Plan } from "@/types/Plan.type";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";

export const PLAN_COLUMNS: ColumnDef<Plan>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Nome" />
    ),
  },
  {
    accessorKey: "trainTime",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Tempo de Treino"
        type="numeral"
      />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Preço"
        type="numeral"
      />
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
      const plan = row.original;
      return <p>{plan.createdAt.toLocaleTimeString()}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const plan = row.original;

      return (
        <DataTableRowActions
          item={plan}
          actions={[
            {
              name: "Edit",
              label: "Editar",
              icon: Pencil,
            },
            {
              name: "Delete",
              label: "Remover",
              icon: Trash,
            },
          ]}
          onAction={console.log}
        />
      );
    },
  },
];
