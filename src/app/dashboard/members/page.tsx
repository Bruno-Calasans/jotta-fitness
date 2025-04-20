import ContentContainer from "@/components/general/ContentContainer";
import MemberTabs from "@/components/dashboard/Members/MemberTabs";
import MembersTable from "@/components/dashboard/Members/MembersTable";

export default function DashboardMembersPage() {
  return (
    <ContentContainer>
      <MembersTable />
      {/* <MemberTabs /> */}
    </ContentContainer>
  );
}
