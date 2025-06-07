import DataTableSortableHeader from "@/components/custom/data-table/DataTableSortableHeader";
import type { Member } from "@/types/Member.type";
import type { ColumnDef } from "@tanstack/react-table";
import EditMemberDialog from "./EditMemberDialog";
import MoreOptionsDropdown from "@/components/custom/data-table/MoreOptionsDropdown";
import RemoveMemberDialog from "./RemoveMemberDialog";
import phoneMask from "@/utils/phoneMask";
import PlanStatus from "./enrollments/EnrollmentStatus";
import MoreDetails from "./MoreDetails";
import defaultDateFormat from "@/utils/defaultDateFormat";
import getLastMemberEnrollment from "@/utils/getLastMemberEnrollment";
import classifyEnrollmentStatus from "@/utils/classifyEnrollmentStatus";

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
    cell: ({ getValue }) => {
      return <p>{phoneMask(getValue<string>())}</p>;
    },
  },
  {
    id: "planName",
    accessorFn: (member) => getLastMemberEnrollment(member)?.plan.name,
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Plano" />
    ),
    cell: ({ getValue }) => {
      const planName = getValue<string | undefined>();
      return <p>{planName ? planName : "Nenhum"}</p>;
    },
  },
  {
    id: "planStatus",
    accessorFn: (member) =>
      classifyEnrollmentStatus(getLastMemberEnrollment(member)),
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Status" />
    ),
    cell: ({ row }) => {
      const member = row.original;
      const lastEnrollment = getLastMemberEnrollment(member);
      return <PlanStatus enrollment={lastEnrollment} />;
    },
  },
  {
    id: "planExpiresIn",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        headerName="Data vencimento"
        type="date"
      />
    ),
    accessorFn: (member) => getLastMemberEnrollment(member)?.expiresIn,
    cell: ({ getValue }) => {
      const expireIn = getValue<Date | undefined>();
      return <p>{expireIn ? defaultDateFormat(expireIn) : "Nenhum"}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;
      return (
        <MoreOptionsDropdown>
          <div className="flex flex-col gap-1">
            {/* <MoreDetails member={member} /> */}
            <EditMemberDialog member={member} />
            <RemoveMemberDialog member={member} />
          </div>
        </MoreOptionsDropdown>
      );
    },
  },
];
