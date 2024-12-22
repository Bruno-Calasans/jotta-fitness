import { ChevronRight, House, LayoutDashboard, Timer } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: House,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Contador",
    url: "/counter",
    icon: Timer,
  },
];

type AppSidebarProps = {
  onClose: () => void;
};

export default function AppSidebar({ onClose }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center">
        <div className="h-10 w-16 rounded-md relative">
          <Image
            fill
            priority
            src="/imgs/logo.png"
            alt="jotta fitness logo"
            className="rounded-lg"
          />
        </div>
        <p className="font-bold">Jotta Fitness</p>
        <Button
          onClick={onClose}
          size="icon"
          className="group/btn absolute top-1 right-1 bg-orange-500 hover:bg-orange-600 border-none"
        >
          <ChevronRight
            size={25}
            className="group-hover/btn:translate-x-1 transition-all text-white"
          />
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
