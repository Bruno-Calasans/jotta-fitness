import DataTableSortableHeader from "@/components/custom/DataTable/DataTableSortableHeader";
import type { ColumnDef } from "@tanstack/react-table";
import type { Log, PlanDiaryLog } from "@/types/Log.type";
import MoreOptionsDropdown from "@/components/custom/MoreOptionsDropdown";
import EditPlanDiaryLogDialog from "./EditPlanDiaryLogDialog";
import RemovePlanDiaryLogDialog from "./RemovePlanDiaryLog";

export const planDiaryColumns: ColumnDef<PlanDiaryLog>[] = [
  {
    id: "name",
    accessorKey: "member.name",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Membro" />
    ),
  },
  {
    accessorKey: "planDiary.plan.name",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Plano" />
    ),
  },
  {
    accessorKey: "planDiary.plan.diary",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Valor da Diária (R$)"
        type="numeral"
      />
    ),
  },
  {
    accessorKey: "planDiary.days",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Dias pagos"
        type="numeral"
      />
    ),
  },
  {
    id: "total",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Total (R$)"
        type="numeral"
      />
    ),
    cell: ({ row }) => {
      const { planDiary } = row.original as Log & { type: "plan-diary" };
      return <p>{(planDiary.plan.diary * planDiary.days).toFixed(2)}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const planDiarylog = row.original as Log & { type: "plan-diary" };

      return (
        <MoreOptionsDropdown>
          <div className="flex flex-col gap-1">
            <EditPlanDiaryLogDialog planDiaryLog={planDiarylog} />
            <RemovePlanDiaryLogDialog planDiaryLog={planDiarylog} />
          </div>
        </MoreOptionsDropdown>
      );
    },
  },
];
