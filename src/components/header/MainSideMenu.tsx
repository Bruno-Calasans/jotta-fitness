import { Menu } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import MainSideMenuContent from "./MainSideMenuContent";

export default function MainSideMenu() {
  return (
    <Sheet>
      {/* Button to open main side menu */}
      <SheetTrigger asChild>
        <Button
          size="sm"
          className="flex gap-1 items-center bg-orange-400 font-bold hover:bg-orange-500 transition-all cursor-pointer md:flex sm:block"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      {/* Content after click on the button */}
      <MainSideMenuContent />
    </Sheet>
  );
}
