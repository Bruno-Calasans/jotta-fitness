import ContentContainer from "@/components/custom/others/ContentContainer";
import MembersTable from "@/components/dashboard/members/MembersTable";
import MembersPageBreadcrumbs from "@/components/dashboard/members/MembersPageBreadcrumbs";

export default function DashboardMembersPage() {
  return (
    <ContentContainer>
      <MembersPageBreadcrumbs />
      <MembersTable />
    </ContentContainer>
  );
}
