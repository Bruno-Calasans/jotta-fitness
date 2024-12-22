"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Timer, LayoutDashboard, LogIn, Menu } from "lucide-react";
import Link from "next/link";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSideBar from "@/components/general/AppSideBar";
import { useState } from "react";
import { cn } from "@/lib/utils";
type HeaderProps = {};

export default function Header({}: HeaderProps) {
  const [openSideBarMenu, setOpenSideBarMenu] = useState(false);

  const toggleSideBarMenu = () => {
    setOpenSideBarMenu((curr) => !curr);
  };

  return (
    <header className="flex justify-between items-center px-4 bg-orange-500 text-black h-20 border-b-2 border-b-orange-500 backdrop-blur-md sticky bg-white/10">
      {/* Side menu */}
      <SidebarProvider className="w-fit fixed" open={openSideBarMenu}>
        <AppSideBar onClose={toggleSideBarMenu} />
      </SidebarProvider>

      {/* Opens side menu */}
      <Button
        onClick={toggleSideBarMenu}
        size="sm"
        className="flex gap-1 items-center bg-orange-400 font-bold hover:bg-orange-500 transition-all delay-75 cursor-pointer"
      >
        <Menu />
      </Button>

      {/* Main Buttons */}
      <div className="flex gap-2">
        <Link href="/register">
          <Button
            size="sm"
            className="flex gap-1 items-center bg-orange-400 font-bold hover:bg-orange-500 transition-all delay-75"
          >
            <LogIn />
            Entrar
          </Button>
        </Link>
      </div>
    </header>
  );
}
