"use client";

import PlanPaymentHistoryTable from "./PlanPaymentHistoryTable";
import MemberPlanResume from "./MemberPlanResume";
import { useMemberStore } from "@/store/memberStore";

export default function PlanMemberTab() {
  const { selectedMember } = useMemberStore();

  if (!selectedMember) return null;

  return (
    <div className="flex flex-col gap-4 mb-20">
      <MemberPlanResume />
      <PlanPaymentHistoryTable />
    </div>
  );
}
