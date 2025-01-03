"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import AppSideBar from "@/components/header/AppSideBar";
import { cn } from "@/lib/utils";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { mainItems, socialItems } from "./headerMenuData";

export default function Header() {
  const pathname = usePathname();
  const canShowHeroImage = pathname === "/";

  return (
    <header
      className={cn(
        "flex  text-black h-24 border-b-2 border-b-orange-500 backdrop-blur-md  bg-white/10 flex-col px-4",
        canShowHeroImage &&
          "bg-[url('/imgs/hero-1.jpg')] lg:bg-center sm:bg-left h-[900px]  lg:h-[800px] md:h-[600px] sm:h-[600px] pt-0 transition-all backdrop-blur-lg",
        !canShowHeroImage && "justify-center"
      )}
    >
      {/* Items */}
      <div className="flex justify-between items-center w-full lg:max-w-[1000px] md:max-w-[800px] mx-auto gap-1">
        {/* Header Logo */}
        <div className="h-20 w-36 rounded-md relative">
          <Image
            fill
            priority
            src="/imgs/logos/logo-1.png"
            alt="jotta fitness logo"
            className="aspect-square rounded-sm"
          />
        </div>

        {/* Main Buttons */}
        <div className="justify-center hidden gap-4 lg:flex">
          {canShowHeroImage &&
            mainItems.map((item) => (
              <Link key={item.title} href={item.url}>
                <Button
                  variant="link"
                  className="flex gap-1 items-center font-bold bg-transparent hover:bg-transparent text-white hover:text-orange-500 transition-all text-2xl p-0"
                >
                  <p>{item.title}</p>
                </Button>
              </Link>
            ))}
        </div>

        {/* Social media */}
        <div className="hidden gap-3 md:hidden sm:hidden">
          {socialItems.map((item) => (
            <Link key={item.title} href={item.url} target="_blank">
              <item.icon
                title={item.title}
                size={20}
                className="text-white hover:text-orange-500"
              />
            </Link>
          ))}
        </div>

        {/* Side menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="sm"
              className="flex gap-1 items-center bg-orange-400 font-bold hover:bg-orange-500 transition-all cursor-pointer md:flex sm:block"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <AppSideBar />
        </Sheet>
      </div>

      {/* Hero Text */}
      <div
        className={cn(
          "text-white flex flex-1 gap-3 justify-center rounded-md w-full flex-col lg:max-w-[1000px] md:max-w-[800px] mx-auto p-6",
          !canShowHeroImage && "hidden"
        )}
      >
        <div>
          <p className="text-8xl text-orange-500 font-bold">Jotta Fitness</p>
          <p className="text-4xl font-bold">Saúde, Vida & Você</p>
          <p className="text-2xl font-bold">
            Conquiste o corpo que você sempre sonhou!
          </p>
        </div>
        <Link href="#our-plans" className="w-fit">
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 font-bold rounded-none w-fit"
          >
            Matrícule-se
          </Button>
        </Link>
      </div>
    </header>
  );
}
