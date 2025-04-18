import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export type Icon = typeof MoreHorizontal;

export type RowActionFn<Item, Action = string> = (
  action: Action,
  item: Item
) => void;

export type TableRowActionData<Action = string> = {
  name: Action;
  label?: React.ReactNode;
  icon: Icon;
  content?: React.ReactNode;
};

export type DataTableRowActionsProps<Item, Action> = {
  item: Item;
  actionsData: TableRowActionData<Action>[];
  onAction: RowActionFn<Item, Action>;
  actionsHeaderLabel?: React.ReactNode;
};

export default function DataTableRowActions<Item, Action>({
  item,
  actionsData,
  actionsHeaderLabel,
  onAction,
}: DataTableRowActionsProps<Item, Action>) {
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
        {/* Action Label */}
        {actionsHeaderLabel && (
          <DropdownMenuLabel>{actionsHeaderLabel}</DropdownMenuLabel>
        )}

        {/* Action Buttons */}
        {actionsData.map((action) => (
          <DropdownMenuItem key={action.name as string} asChild>
            {action.content ? (
              action.content
            ) : (
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start"
                onClick={() => onAction(action.name, item)}
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </Button>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
