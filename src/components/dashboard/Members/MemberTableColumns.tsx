import DataTableSortableHeader from "@/components/custom/DataTable/DataTableSortableHeader";
import type { Member } from "@/types/Member.type";
import type { ColumnDef } from "@tanstack/react-table";
import EditMemberDialog from "./EditMemberDialog";
import MoreOptionsDropdown from "@/components/custom/MoreOptionsDropdown";
import RemoveMemberDialog from "./RemoveMemberDialog";
import { Badge } from "@/components/ui/badge";
import phoneMask from "@/utils/phoneMask";
import PlanStatus from "./Plans/PlanStatus";

export const memberColumns: ColumnDef<Member>[] = [
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
      const { planPayments } = row.original;
      return <PlanStatus planPayment={planPayments[planPayments.length - 1]} />;
    },
  },
// {
//   accessorKey: "createdAt",
//   header: ({ column }) => (
//     <DataTableSortableHeader
//       column={column}
//       headerName="Data de Criação"
//       type="date"
//     />
//   ),
//   cell: ({ row }) => {
//     const member = row.original;
//     return (
//       <p>
//         {`${member.createdAt.toLocaleDateString()} às ${member.createdAt.toLocaleTimeString()}`}
//       </p>
//     );
//   },
// },
  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;

      return (
        <MoreOptionsDropdown>
          <div className="flex flex-col gap-1">
            <EditMemberDialog member={member} />
            <RemoveMemberDialog member={member} />
          </div>
        </MoreOptionsDropdown>
      );
    },
  },
];
