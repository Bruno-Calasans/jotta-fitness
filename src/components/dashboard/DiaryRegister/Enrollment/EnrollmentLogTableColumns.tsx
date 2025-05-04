import DataTableSortableHeader from "@/components/custom/DataTable/DataTableSortableHeader";
import type { ColumnDef } from "@tanstack/react-table";
import type { EnrollmentLog } from "@/types/Log.type";
import MoreOptionsDropdown from "@/components/custom/MoreOptionsDropdown";
import EditEnrollmentLogDialog from "./EditEnrollmentLogDialog";
import RemoveEnrollmentLogDialog from "./RemoveEnrollmentLogDialog";

export const enrollmentLogColumns: ColumnDef<EnrollmentLog>[] = [
  {
    id: "name",
    accessorKey: "member.name",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Membro" />
    ),
  },
  {
    accessorKey: "enrollment.plan.name",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Plano" />
    ),
  },
  {
    accessorKey: "enrollment.months",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Meses"
        type="numeral"
      />
    ),
  },
  {
    accessorKey: "enrollment.startsIn",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Data de Inscrição"
        type="date"
      />
    ),
    cell: ({ row }) => {
      const { enrollment } = row.original;
      return <p>{enrollment.startsIn.toLocaleDateString()}</p>;
    },
  },
  {
    accessorKey: "enrollment.expiresIn",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Data de Término"
        type="date"
      />
    ),
    cell: ({ row }) => {
      const { enrollment } = row.original;
      return <p>{enrollment.expiresIn.toLocaleDateString()}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const enrollmentLog = row.original;

      return (
        <MoreOptionsDropdown>
          <div className="flex flex-col gap-1">
            <EditEnrollmentLogDialog enrollmentLog={enrollmentLog} />
            <RemoveEnrollmentLogDialog enrollmentLog={enrollmentLog} />
          </div>
        </MoreOptionsDropdown>
      );
    },
  },
];
