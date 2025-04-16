import {
  SquareChevronLeft,
  SquareChevronRight,
  LayoutDashboard,
} from "lucide-react";

import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";

type DashboardSideBardButtonProps = {};

export default function DashboardSideBarButton({}: DashboardSideBardButtonProps) {
  const { open, toggleSidebar } = useSidebar();

  return (
    <button
      id="trigger"
      className={cn(
        "flex justify-end p-1 transition-all",
        !open && "justify-center"
      )}
    >
      {open ? (
        <div className="flex justify-between w-full text-orange-600">
          <Link href="/dashboard" className="flex gap-1 items-center">
            <LayoutDashboard />
            <p className="text-lg">Dashboard</p>
          </Link>
          <SquareChevronLeft
            className="text-orange-600"
            onClick={toggleSidebar}
          />
        </div>
      ) : (
        <SquareChevronRight
          className="text-orange-600"
          onClick={toggleSidebar}
        />
      )}
    </button>
  );
}
