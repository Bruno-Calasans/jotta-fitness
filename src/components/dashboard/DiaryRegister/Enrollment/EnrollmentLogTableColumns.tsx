import DataTableSortableHeader from "@/components/custom/DataTable/DataTableSortableHeader";
import type { ColumnDef } from "@tanstack/react-table";
import MoreOptionsDropdown from "@/components/custom/MoreOptionsDropdown";
import type { EnrollmentLog } from "@/types/Log.type";
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
    accessorKey: "plan.name",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Plano" />
    ),
  },
  {
    accessorKey: "months",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Meses" />
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
      const { createdAt } = row.original;
      return <p>{createdAt.toLocaleDateString()}</p>;
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
