import DataTableSortableHeader from "@/components/custom/data-table/DataTableSortableHeader";
import type { ColumnDef } from "@tanstack/react-table";
import type { Log, PlanDiaryLog } from "@/types/Log.type";
import MoreOptionsDropdown from "@/components/custom/data-table/MoreOptionsDropdown";
import EditPlanDiaryLogDialog from "./EditPlanDiaryLogDialog";
import RemovePlanDiaryLogDialog from "./RemovePlanDiaryLog";
import defaultDateFormat from "@/utils/defaultDateFormat";
import calcPlanDiaryPrice from "@/utils/calcPlanDiaryPrice";

export const planDiaryColumns: ColumnDef<PlanDiaryLog>[] = [
  {
    id: "name",
    accessorKey: "member.name",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Membro" />
    ),
    cell: ({ row }) => {
      const { member } = row.original;
      return <p>{member ? member.name : "Não cadastrado"}</p>;
    },
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
    accessorFn: ({ planDiary }) => calcPlanDiaryPrice(planDiary),
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Total (R$)"
        type="numeral"
      />
    ),
    cell: ({ getValue }) => {
      return <p>{getValue<number>().toFixed(2)}</p>;
    },
  },
  {
    accessorKey: "planDiary.expiresIn",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Expira em"
        type="date"
      />
    ),
    cell: ({ row }) => {
      const { planDiary } = row.original;
      return defaultDateFormat(planDiary.expiresIn);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const planDiarylog = row.original;
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
