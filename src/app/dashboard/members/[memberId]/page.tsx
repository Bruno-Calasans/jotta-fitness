"use client";

import Loader from "@/components/custom/Loader";
import MemberPageBreadcrumbs from "@/components/dashboard/Members/MemberPageBreadcrumbs";
import MemberTabs from "@/components/dashboard/Members/MemberTabs";
import ContentContainer from "@/components/general/ContentContainer";
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
        <Loader text="Procurando membro" />
      </div>
    );

  return (
    <ContentContainer>
      <MemberPageBreadcrumbs />
      <MemberTabs />
    </ContentContainer>
  );
}
