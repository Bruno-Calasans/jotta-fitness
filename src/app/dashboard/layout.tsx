"use client";

import DashboardSidebar from "@/components/dashboard/dashboard-side-bar/DashboardSideBar";
import dynamic from "next/dynamic";

const DashboardSidebarNoSSR = dynamic(
  () => import("@/components/dashboard/dashboard-side-bar/DashboardSideBar"),
  { ssr: false }
);

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="text-white relative flex">
      {/* <DashboardSidebar /> */}
      <DashboardSidebarNoSSR />
      {children}
    </main>
  );
}
