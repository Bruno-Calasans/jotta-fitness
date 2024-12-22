"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Timer, LayoutDashboard, LogIn, Menu } from "lucide-react";
import Link from "next/link";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSideBar from "@/components/general/AppSideBar";
import { useState } from "react";
import { cn } from "@/lib/utils";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

type HeaderProps = {};

export default function Header({}: HeaderProps) {
  const pathname = usePathname();

  const [openSideBarMenu, setOpenSideBarMenu] = useState(false);

  const toggleSideBarMenu = () => {
    setOpenSideBarMenu((curr) => !curr);
  };

  console.log(pathname);

  return (
    <header
      className={cn(
        "flex justify-between items-start bg-orange-500 text-black h-28 border-b-2 border-b-orange-500 backdrop-blur-md  bg-white/10 p-5",
        pathname === "/" && "bg-[url('/imgs/hero-1.jpg')] h-[800px]"
      )}
    >
      <div className="flex justify-between items-center gap-1 w-full">
        {/* Logo */}
        <div className="h-16 w-24 rounded-md relative">
          <Image
            fill
            priority
            src="/imgs/logo.png"
            alt="jotta fitness logo"
            className="aspect-square rounded-sm"
          />
        </div>

        {/* Main Buttons */}
        <div className="flex justify-center gap-4 md:flex sm:hidden">
          <Link href="/">
            <Button
              size="lg"
              variant="link"
              className="flex gap-1 items-center font-bold text-white hover:text-orange-500 transition-all text-2xl p-0"
            >
              Home
            </Button>
          </Link>

          <Link href="#benefits">
            <Button
              size="lg"
              variant="link"
              className="flex gap-1 items-center font-bold text-white hover:text-orange-500 transition-all delay-75 text-2xl p-0"
            >
              Vantagens
            </Button>
          </Link>
          <Link href="#services">
            <Button
              size="lg"
              variant="link"
              className="flex gap-1 items-center font-bold text-white hover:text-orange-500 transition-all delay-75 text-2xl p-0"
            >
              Serviços
            </Button>
          </Link>

          <Link href="#our-plans">
            <Button
              size="lg"
              variant="link"
              className="flex gap-1 items-center font-bold text-white hover:text-orange-500 transition-all delay-75 text-2xl p-0"
            >
              Nossos Planos
            </Button>
          </Link>
        </div>

        {/* Side menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              onClick={toggleSideBarMenu}
              size="sm"
              className="flex gap-1 items-center bg-orange-400 font-bold hover:bg-orange-500 transition-all delay-75 cursor-pointer"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <AppSideBar onClose={toggleSideBarMenu} />
        </Sheet>
      </div>
    </header>
  );
}
