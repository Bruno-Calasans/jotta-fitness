import { RowActionFn } from "@/components/custom/dataTable/DataTableRowActions";
import DataTableSortableHeader from "@/components/custom/dataTable/DataTableSortableHeader";
import type { Plan } from "@/types/Plan.type";
import type { ColumnDef } from "@tanstack/react-table";
import EditPlanDialog from "./EditPlanDialog";
import MoreOptionsDropdown from "@/components/custom/dataTable/MoreOptionsDropdown";
import RemovePlanDialog from "./RemovePlanDialog";
import defaultDateFormat from "@/utils/defaultDateFormat";

export type PlanRowActions = "Edit" | "Delete";

export type PlanRowActionFn = RowActionFn<Plan, PlanRowActions>;

export const planColumns: ColumnDef<Plan>[] = [
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
        headerName="Tempo de Treino (min)"
        type="numeral"
      />
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
    accessorKey: "diary",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Diária (R$)"
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
      return <p>{defaultDateFormat(plan.createdAt)}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const plan = row.original;

      return (
        <MoreOptionsDropdown>
          <div className="flex flex-col gap-1">
            <EditPlanDialog plan={plan} />
            <RemovePlanDialog plan={plan} />
          </div>
        </MoreOptionsDropdown>
      );
    },
  },
];
