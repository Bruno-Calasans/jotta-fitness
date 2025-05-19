"use client";

import DataLoader from "@/components/custom/loaders/DataLoader";
import MemberPageBreadcrumbs from "@/components/dashboard/members/MemberPageBreadcrumbs";
import MemberTabs from "@/components/dashboard/members/MemberTabs";
import ContentContainer from "@/components/custom/others/ContentContainer";
import { useMemberStore } from "@/store/memberStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type MemberInfoPageProps = {
  params: Promise<{ memberId: string }>;
};

export default function MemberInfoPage({ params }: MemberInfoPageProps) {
  const [loading, setLoading] = useState(true);
  const { getMemberById, setSelectedMember } = useMemberStore();
  const router = useRouter();

  const loadMember = async () => {
    const { memberId } = await params;
    if (!memberId) return;
    const foundMember = getMemberById(memberId);
    if (!foundMember) return router.push("/dashboard/members");
    setSelectedMember(foundMember);
    setLoading(false);
  };

  useEffect(() => {
    loadMember();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center flex-1">
        <DataLoader text="Procurando membro" />
      </div>
    );

  return (
    <ContentContainer>
      <MemberPageBreadcrumbs />
      <MemberTabs />
    </ContentContainer>
  );
}
