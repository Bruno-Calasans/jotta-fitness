import DataTableSortableHeader from "@/components/custom/DataTable/DataTableSortableHeader";
import type { Member } from "@/types/Member.type";
import type { ColumnDef } from "@tanstack/react-table";
// import EditMemberDialog from "./EditMemberDialog";
import MoreOptionsDropdown from "@/components/custom/MoreOptionsDropdown";
// import RemoveMemberDialog from "./RemoveMemberDialog";
import phoneMask from "@/utils/phoneMask";
import { PlanPayment } from "@/types/Payment.type";

export const planPaymentColumns: ColumnDef<PlanPayment>[] = [
  {
    id: "name",
    accessorKey: "plan.name",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Nome" />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} headerName="Quantidade" />
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
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;

      return (
        <MoreOptionsDropdown>
          <div className="flex flex-col gap-1">
            {/* <EditMemberDialog member={member} /> */}
            {/* <RemoveMemberDialog member={member} /> */}
          </div>
        </MoreOptionsDropdown>
      );
    },
  },
];
