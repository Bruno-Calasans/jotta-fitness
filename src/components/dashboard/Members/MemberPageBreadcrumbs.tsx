import CustomBreadcrumb from "@/components/custom/CustomBreadcrumb";
import { useMemberStore } from "@/store/memberStore";
import { House } from "lucide-react";

type MemberPageBreadcrumbsProps = {};

export default function MemberPageBreadcrumbs({}: MemberPageBreadcrumbsProps) {
  const { selectedMember } = useMemberStore();
  return (
    <CustomBreadcrumb
      data={[
        {
          label: <House size={18} />,
          url: "/dashboard",
        },
        {
          label: "membros",
          url: "/dashboard/members",
        },
      ]}
      page={selectedMember ? selectedMember.name : "Membro"}
    />
  );
}
