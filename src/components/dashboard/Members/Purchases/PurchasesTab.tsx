"use client";

// import SubscriptionsHistoryTable from "./SubscriptionsHistoryTable";
// import MemberPlanResume from "./CurrentSubscriptionResume";
import { useMemberStore } from "@/store/memberStore";
import PurchasesHistoryTable from "./PurchasesHistoryTable";

export default function PurchasesTab() {
  const { selectedMember } = useMemberStore();

  if (!selectedMember) return null;

  return (
    <div className="flex flex-col gap-4 mb-20">
      {/* <MemberPlanResume /> */}
      {/* <SubscriptionsHistoryTable /> */}
      <PurchasesHistoryTable />
    </div>
  );
}
