import MemberTabs from "@/components/dashboard/Members/MemberTabs";
import ContentContainer from "@/components/general/ContentContainer";

type MemberInfoPageProps = {};

export default function MemberInfoPage({}: MemberInfoPageProps) {
  return (
    <ContentContainer>
      <MemberTabs />
    </ContentContainer>
  );
}
