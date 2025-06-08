import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export type MoreOptionsDropdownProps = {
  label?: React.ReactNode;
  children: React.ReactNode;
  position?: "vertical" | "horizontal";
  classNames?: {
    trigger?: string;
  };
};

export default function MoreOptionsDropdown({
  label,
  children,
  position,
  classNames,
}: MoreOptionsDropdownProps) {
  return (
    <DropdownMenu>
      {/* Open dropdown */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "h-8 w-8 p-0 hover:bg-orange-500 text-white group transition-all",
            classNames?.trigger
          )}
        >
          <span className="sr-only">Open menu</span>
          {position === "horizontal" ? (
            <MoreHorizontal className="h-4 w-4 group-hover:text-white" />
          ) : (
            <MoreVertical className="h-4 w-4 group-hover:text-white" />
          )}
        </Button>
      </DropdownMenuTrigger>
      {/* After open dropdown */}
      <DropdownMenuContent align="end">
        {/* Action Label */}
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}

        {/* Action Buttons */}
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
