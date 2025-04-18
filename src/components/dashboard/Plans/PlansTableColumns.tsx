import DataTableRowActions, {
  RowActionFn,
  TableRowActionData,
} from "@/components/custom/DataTable/DataTableRowActions";
import DataTableSortableHeader from "@/components/custom/DataTable/DataTableSortableHeader";
import type { Plan } from "@/types/Plan.type";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import EditPlanDialog from "./EditPlanDialog";
import MoreOptionsDropdown from "@/components/custom/MoreOptionsDropdown";
import RemovePlanDialog from "./RemovePlanDialog";

export type PlanRowActions = "Edit" | "Delete";

export type PlanRowActionFn = RowActionFn<Plan, PlanRowActions>;

export const planRowActionsData: TableRowActionData<PlanRowActions>[] = [
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
];

export const createColumns = (onAction: PlanRowActionFn) => {
  const PLAN_COLUMNS: ColumnDef<Plan>[] = [
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
  return PLAN_COLUMNS;
};
