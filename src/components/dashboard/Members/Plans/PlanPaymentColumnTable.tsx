import DataTableSortableHeader from "@/components/custom/DataTable/DataTableSortableHeader";
import type { ColumnDef } from "@tanstack/react-table";
import MoreOptionsDropdown from "@/components/custom/MoreOptionsDropdown";
import { PlanPayment } from "@/types/Payment.type";
import RemovePlanSubscriptionDialog from "./RemovePlanSubscriptionDialog";
import EditPlanSubscriptionDialog from "./EditPlanSubscriptionDialog";
import PlanStatus from "./PlanStatus";

export const planPaymentColumns: ColumnDef<PlanPayment>[] = [
  {
    id: "name",
    accessorKey: "plan.name",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Nome" />
    ),
  },
  {
    accessorKey: "months",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Meses" />
    ),
  },
  {
    id: "Status",
    accessorKey: "plan",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Status" />
    ),
    cell: ({ row }) => {
      const planPayment = row.original;
      return <PlanStatus planPayment={planPayment} />;
    },
  },
  {
    accessorKey: "startsIn",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Data de Inscrição"
        type="date"
      />
    ),
    cell: ({ row }) => {
      const startsIn = row.original.startsIn;
      return <p>{startsIn.toLocaleDateString()}</p>;
    },
  },
  {
    accessorKey: "expiresIn",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Data de Vencimento"
        type="date"
      />
    ),
    cell: ({ row }) => {
      const expiresIn = row.original.expiresIn;
      return <p>{expiresIn.toLocaleDateString()}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const planPayment = row.original;

      return (
        <MoreOptionsDropdown>
          <div className="flex flex-col gap-1">
            <EditPlanSubscriptionDialog planPayment={planPayment} />
            <RemovePlanSubscriptionDialog planPayment={planPayment} />
          </div>
        </MoreOptionsDropdown>
      );
    },
  },
];
