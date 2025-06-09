import DashboardSidebar from "@/components/dashboard/dashboard-side-bar/DashboardSideBar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="text-white relative flex">
      <DashboardSidebar />
      {children}
    </main>
  );
}
