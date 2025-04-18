import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export type MoreOptionsDropdownProps = {
  label?: React.ReactNode;
  children: React.ReactNode;
};

export default function MoreOptionsDropdown({
  label,
  children,
}: MoreOptionsDropdownProps) {
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
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}

        {/* Action Buttons */}
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
