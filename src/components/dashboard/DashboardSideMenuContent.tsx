import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  registerItems,
  profitItems,
  lossItems,
  memberItems,
} from "./dashboardMenuData";

type DashboardSideMenuContentProps = {};

export default function DashboardSideMenuContent({}: DashboardSideMenuContentProps) {
  return (
    <SheetContent side="left" className="flex flex-col gap-2 w-[300px]">
      <SheetHeader className="mb-2">
        <SheetTitle asChild className="flex items-center flex-1 gap-1 ">
          <div className="flex">
            <div className="h-10 w-20 rounded-md relative">
              <Image
                fill
                priority
                src="/imgs/logos/logo-2.png"
                alt="jotta fitness logo"
                className="aspect-square rounded-sm"
              />
            </div>
            <p className="mt-4">Dashboard</p>
          </div>
        </SheetTitle>
      </SheetHeader>

      {/* Registros */}
      <div className="flex flex-col gap-2 mb-2">
        <p className="text-sm font-bold text-stone-800 border-b-2 border-orange-500">
          Registros
        </p>
        <div className="flex flex-col text-orange-black gap-1 text-black">
          {registerItems.map((item) => (
            <Link key={item.title} href={item.url}>
              <Button className="flex gap-1 items-center transition-all w-full justify-start px-2 bg-white text-ora shadow-none hover:bg-stone-100 hover:text-orange-500">
                <item.icon />
                <p>{item.title}</p>
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Lucro */}
      <div className="flex flex-col gap-2 mb-2">
        <p className="text-sm font-bold text-stone-800 border-b-2 border-orange-500">
          Lucro
        </p>

        <div className="flex flex-col text-orange-black gap-1 text-black">
          {profitItems.map((item) => (
            <Link key={item.title} href={item.url}>
              <Button className="flex gap-1 items-center transition-all w-full justify-start px-2 bg-white text-ora shadow-none hover:bg-stone-100 hover:text-orange-500">
                <item.icon />
                <p>{item.title}</p>
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Despesas */}
      <div className="flex flex-col gap-2 mb-2">
        <p className="text-sm font-bold text-stone-800 border-b-2 border-orange-500">
          Prejuízos
        </p>

        <div className="flex flex-col text-orange-black gap-1 text-black">
          {lossItems.map((item) => (
            <Link key={item.title} href={item.url}>
              <Button className="flex gap-1 items-center transition-all w-full justify-start px-2 bg-white text-ora shadow-none hover:bg-stone-100 hover:text-orange-500">
                <item.icon />
                <p>{item.title}</p>
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Membros */}
      <div className="flex flex-col gap-2 mb-2">
        <p className="text-sm font-bold text-stone-800 border-b-2 border-orange-500">
          Membros
        </p>

        <div className="flex flex-col text-orange-black gap-1 text-black">
          {memberItems.map((item) => (
            <Link key={item.title} href={item.url}>
              <Button className="flex gap-1 items-center transition-all w-full justify-start px-2 bg-white text-ora shadow-none hover:bg-stone-100 hover:text-orange-500">
                <item.icon />
                <p>{item.title}</p>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </SheetContent>
  );
}
