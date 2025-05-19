"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { DashboardSidebarItems } from "./dashboardSideMenuData";
import Link from "next/link";
import DashboardSideBarButton from "./DashboardSideBarButton";

export default function DashboardSidebar() {
  return (
    <SidebarProvider id="dashboard-side-bar" className="w-fit transition-all">
      <Sidebar className="absolute" collapsible="icon">
        <DashboardSideBarButton />
        <SidebarContent>
          {Object.keys(DashboardSidebarItems).map((category) => (
            // Category
            <SidebarGroup key={category}>
              <SidebarGroupLabel>{category}</SidebarGroupLabel>
              <SidebarGroupContent>
                {/* Category's items */}
                <SidebarMenu>
                  {DashboardSidebarItems[
                    category as keyof typeof DashboardSidebarItems
                  ].map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={`/dashboard/` + item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
