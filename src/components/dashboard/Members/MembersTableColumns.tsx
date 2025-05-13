import DataTableSortableHeader from "@/components/custom/DataTable/DataTableSortableHeader";
import type { Member } from "@/types/Member.type";
import type { ColumnDef } from "@tanstack/react-table";
import EditMemberDialog from "./EditMemberDialog";
import MoreOptionsDropdown from "@/components/custom/MoreOptionsDropdown";
import RemoveMemberDialog from "./RemoveMemberDialog";
import { Badge } from "@/components/ui/badge";
import phoneMask from "@/utils/phoneMask";
import PlanStatus from "./Enrollments/EnrollmentStatus";
import MoreDetails from "./MoreDetails";

export const membersColumns: ColumnDef<Member>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Nome" />
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Celular" />
    ),
    cell: ({ row }) => {
      const member = row.original;
      return <p>{phoneMask(member.phone)}</p>;
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Staff" />
    ),
    cell: ({ row }) => {
      const member = row.original;
      if (member.role)
        return (
          <Badge
            className="bg-emerald-500 border-emerald-500 text-white"
            variant="outline"
          >
            Sim
          </Badge>
        );

      return (
        <Badge
          className="bg-red-500 border-red-500 text-white"
          variant="outline"
        >
          Não
        </Badge>
      );
    },
  },
  {
    accessorKey: "planPayments",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Plano" />
    ),
    cell: ({ row }) => {
      const { enrollments } = row.original;
      return <PlanStatus enrollment={enrollments[enrollments.length - 1]} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;

      return (
        <MoreOptionsDropdown>
          <div className="flex flex-col gap-1">
            <MoreDetails member={member} />
            <EditMemberDialog member={member} />
            <RemoveMemberDialog member={member} />
          </div>
        </MoreOptionsDropdown>
      );
    },
  },
];
