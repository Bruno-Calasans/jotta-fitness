import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";

type Icon = typeof MoreHorizontal;

type TableRowActionData = {
  name: string;
  label: React.ReactNode;
  icon: Icon;
};

type DataTableRowActionsProps<T> = {
  item: T;
  actions: TableRowActionData[];
  onAction: (actionName: string, item: T) => void;
  actionsHeaderLabel?: React.ReactNode;
};

export default function DataTableRowActions<T>({
  item,
  actions,
  actionsHeaderLabel,
  onAction,
}: DataTableRowActionsProps<T>) {
  return (
    <DropdownMenu>
      {/* Open dropdown */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 hover:bg-orange-500 text-white group transition-all"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4 group-hover:text-white" />
        </Button>
      </DropdownMenuTrigger>
      {/* After open dropdown */}
      <DropdownMenuContent align="end">
        {actionsHeaderLabel && (
          <DropdownMenuLabel>{actionsHeaderLabel}</DropdownMenuLabel>
        )}

        {actions.map((action) => (
          <DropdownMenuItem key={action.name} asChild>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start"
              onClick={() => onAction(action.name, item)}
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
