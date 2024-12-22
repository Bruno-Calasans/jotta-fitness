import { LogIn } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { mainItems, socialItems, adminItems } from "./headerMenuData";

type AppSidebarProps = {
  onClose: () => void;
};

export default function AppSidebar({ onClose }: AppSidebarProps) {
  return (
    <SheetContent className="flex flex-col gap-2">
      <SheetHeader>
        <SheetTitle asChild className="flex items-center flex-1 gap-1 ">
          <div>
            <div className="h-10 w-20 rounded-md relative">
              <Image
                fill
                priority
                src="/imgs/logo.png"
                alt="jotta fitness logo"
                className="aspect-square rounded-sm"
              />
            </div>
            <p>Jotta Fitness</p>
          </div>
        </SheetTitle>

        <SheetDescription asChild className="flex">
          <div className="flex flex-1 gap-2 justify-end items-center font-normal text-sm">
            <p>Olá, visitante.</p>
            <Button
              size="sm"
              className="bg-orange-500 font-bold hover:bg-orange-600"
            >
              <LogIn />
              Entrar
            </Button>
          </div>
        </SheetDescription>
      </SheetHeader>

      {/* Principal */}
      <div className="flex flex-col gap-2 mb-2">
        <p className="text-sm font-bold text-stone-800 border-b-2 border-orange-500">
          Principal
        </p>
        <div className="flex flex-col text-orange-black gap-1 text-black">
          {mainItems.map((item) => (
            <Link key={item.title} href={item.url}>
              <Button className="flex gap-1 items-center transition-all w-full justify-start px-2 bg-white text-ora shadow-none hover:bg-stone-100 hover:text-orange-500">
                <item.icon />
                <p>{item.title}</p>
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Midia Social */}
      <div className="flex flex-col gap-2 mb-2">
        <p className="text-sm font-bold text-stone-800 border-b-2 border-orange-500">
          Redes Sociais
        </p>

        <div className="flex flex-col text-orange-black gap-1 text-black">
          {socialItems.map((item) => (
            <Link key={item.title} href={item.url}>
              <Button className="flex gap-1 items-center transition-all w-full justify-start px-2 bg-white text-ora shadow-none hover:bg-stone-100 hover:text-orange-500">
                <item.icon />
                <p>{item.title}</p>
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Administração */}
      <div className="flex flex-col gap-2 mb-2">
        <p className="text-sm font-bold text-stone-800 border-b-2 border-orange-500">
          Administração
        </p>

        <div className="flex flex-col text-orange-black gap-1 text-black">
          {adminItems.map((item) => (
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
