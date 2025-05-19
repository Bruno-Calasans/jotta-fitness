import {
  LayoutDashboard,
  SquareChevronLeft,
  SquareChevronRight,
} from "lucide-react";

import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect } from "react";

export default function DashboardSideBarButton() {
  const { open, toggleSidebar, setOpen } = useSidebar();

  const toggleSideBarHandler = () => {
    if (open) {
      localStorage.removeItem("side-bar");
    } else {
      localStorage.setItem("side-bar", "true");
    }

    toggleSidebar();
  };

  useEffect(() => {
    setOpen(!!localStorage.getItem("side-bar"));
  }, []);

  return (
    <button
      id="trigger"
      className={cn(
        "flex justify-end p-1 transition-all",
        !open && "justify-center",
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
            onClick={toggleSideBarHandler}
          />
        </div>
      ) : (
        <SquareChevronRight
          className="text-orange-600"
          onClick={toggleSideBarHandler}
        />
      )}
    </button>
  );
}
