import ContentContainer from "@/components/general/ContentContainer";
import MembersTable from "@/components/dashboard/Members/MembersTable";
import MembersPageBreadcrumbs from "@/components/dashboard/Members/MembersPageBreadcrumbs";

export default function DashboardMembersPage() {
  return (
    <ContentContainer>
      <MembersPageBreadcrumbs />
      <MembersTable />
    </ContentContainer>
  );
}
