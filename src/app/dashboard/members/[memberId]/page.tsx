"use client";

import MemberTabs from "@/components/dashboard/Members/MemberTabs";
import ContentContainer from "@/components/general/ContentContainer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useMemberStore } from "@/store/memberStore";
import Link from "next/link";

type MemberInfoPageProps = {};

export default function MemberInfoPage({}: MemberInfoPageProps) {
  const { selectedMember } = useMemberStore();
  return (
    <ContentContainer>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              asChild
              className="text-white hover:text-orange-500 transition-all"
            >
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              asChild
              className="text-white hover:text-orange-500 transition-all"
            >
              <Link href="/dashboard/members">Membros</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-white">
              {selectedMember ? selectedMember.name : "Membro"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <MemberTabs />
    </ContentContainer>
  );
}
