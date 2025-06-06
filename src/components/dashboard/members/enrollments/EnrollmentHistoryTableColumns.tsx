import DataTableSortableHeader from "@/components/custom/data-table/DataTableSortableHeader";
import type { ColumnDef } from "@tanstack/react-table";
import MoreOptionsDropdown from "@/components/custom/data-table/MoreOptionsDropdown";
import { Enrollment } from "@/types/Enrollment.type";
import RemoveEnrollmentDialog from "./RemoveEnrollmentDialog";
import EditSubscriptionDialog from "./EditEnrollmentDialog";
import PlanStatus from "./EnrollmentStatus";
import defaultDateFormat from "@/utils/defaultDateFormat";
import classifyEnrollmentStatus from "@/utils/classifyEnrollmentStatus";

export const enrollmentColumns: ColumnDef<Enrollment>[] = [
  {
    id: "planName",
    accessorKey: "plan.name",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Plano" />
    ),
  },
  {
    accessorKey: "months",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Meses"
        type="numeral"
      />
    ),
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
      const { startsIn } = row.original;
      return <p>{defaultDateFormat(startsIn)}</p>;
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
      const { expiresIn } = row.original;
      return <p>{defaultDateFormat(expiresIn)}</p>;
    },
  },
  {
    id: "planStatus",
    accessorFn: (enrollment) => classifyEnrollmentStatus(enrollment),
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Status" />
    ),
    cell: ({ row }) => {
      const enrollment = row.original;
      return <PlanStatus enrollment={enrollment} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const enrollment = row.original;

      return (
        <MoreOptionsDropdown>
          <div className="flex flex-col gap-1">
            <EditSubscriptionDialog enrollment={enrollment} />
            <RemoveEnrollmentDialog enrollment={enrollment} />
          </div>
        </MoreOptionsDropdown>
      );
    },
  },
];
