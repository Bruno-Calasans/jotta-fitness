import CustomBreadcrumb from "@/components/custom/others/CustomBreadcrumb";
import { useMemberStore } from "@/store/memberStore";
import { House } from "lucide-react";

export default function MemberPageBreadcrumbs() {
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
