import DataTableSortableHeader from "@/components/custom/data-table/DataTableSortableHeader";
import type { ColumnDef } from "@tanstack/react-table";
import type { EnrollmentLog } from "@/types/Log.type";
import MoreOptionsDropdown from "@/components/custom/data-table/MoreOptionsDropdown";
import EditEnrollmentLogDialog from "./EditEnrollmentLogDialog";
import RemoveEnrollmentLogDialog from "./RemoveEnrollmentLogDialog";
import calcEnrollmentPrice from "@/utils/calcEnrollmentPrice";
import defaultDateFormat from "@/utils/defaultDateFormat";

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
        headerName="Mese(s)"
        type="numeral"
      />
    ),
  },
  {
    id: "total",
    accessorKey: "enrollment.months",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Total (R$)"
        type="numeral"
      />
    ),
    cell: ({ row }) => {
      const { enrollment } = row.original;
      return <p>{calcEnrollmentPrice(enrollment).toFixed(2)}</p>;
    },
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
      return <p>{defaultDateFormat(enrollment.startsIn)}</p>;
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
      return <p>{defaultDateFormat(enrollment.expiresIn)}</p>;
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
