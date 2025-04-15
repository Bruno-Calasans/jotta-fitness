import { LayoutDashboard } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function DashboardSideMenu() {
  return (
    <Sheet>
      <SheetTrigger id="admin-dashboard" title="Admin Dashboard" asChild>
        <Button
          size="sm"
          className="flex gap-1 items-center bg-indigo-400 font-bold hover:bg-indigo-500 transition-all cursor-pointer md:flex sm:block"
        >
          Dashboard <LayoutDashboard />
        </Button>
      </SheetTrigger>
      {/* <AppSideBar /> */}
    </Sheet>
  );
}
