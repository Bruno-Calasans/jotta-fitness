"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import HeaderLogo from "./HeaderLogo";
import DashboardSideMenu from "./DashboardSideMenu";
import MainSideMenu from "./MainSideMenu";
import HeroText from "./HeroText";
import HeaderButtons from "./HeaderButtons";

export default function Header() {
  const pathname = usePathname();
  const canShowHeroImage = pathname === "/";
  const canShowDashboard = pathname === "/dashboard";

  return (
    <header
      className={cn(
        "flex  text-black h-24 border-b-2 border-b-orange-500 backdrop-blur-md  bg-white/10 flex-col px-4",
        canShowHeroImage &&
          "bg-[url('/imgs/hero-1.jpg')] lg:bg-center sm:bg-left h-[900px]  lg:h-[800px] md:h-[600px] sm:h-[600px] pt-0 transition-all backdrop-blur-lg",
        !canShowHeroImage && "justify-center",
      )}
    >
      {/* Header Items */}
      <div className="flex justify-between items-center w-full lg:max-w-[1000px] md:max-w-[800px] mx-auto gap-1">
        {/* Header Logo */}
        <HeaderLogo />

        {/* Dashboard Menu */}
        {/* {canShowDashboard && <DashboardSideMenu />} */}

        {/* Header Center Buttons for larger screens */}
        {canShowHeroImage && <HeaderButtons />}

        {/* Social media buttons */}
        {/* <div className="gap-3 md:hidden sm:hidden">
          {socialItems.map((item) => (
            <Link key={item.title} href={item.url} target="_blank">
              <item.icon
                title={item.title}
                size={20}
                className="text-white hover:text-orange-500"
              />
            </Link>
          ))}
        </div> */}

        {/* Main Side menu */}
        <MainSideMenu />
      </div>

      {/* Hero Text */}
      {canShowHeroImage && <HeroText />}
    </header>
  );
}
