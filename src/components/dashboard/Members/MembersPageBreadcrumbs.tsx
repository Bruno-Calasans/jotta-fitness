import CustomBreadcrumb from "@/components/custom/others/CustomBreadcrumb";
import { House } from "lucide-react";

export default function MembersPageBreadcrumbs() {
  return (
    <CustomBreadcrumb
      data={[
        {
          label: <House size={18} />,
          url: "/dashboard",
        },
      ]}
      page="membros"
    />
  );
}
