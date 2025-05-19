"use client";

import EnrollmentsHistoryTable from "./EnrollmentsHistoryTable";
import CurrentEnrollmentResume from "./CurrentEnrollmentResume";
import { useMemberStore } from "@/store/memberStore";

export default function EnrollmentTab() {
  const { selectedMember } = useMemberStore();

  if (!selectedMember) return null;

  return (
    <div className="flex flex-col gap-4 mb-20">
      <CurrentEnrollmentResume />
      <EnrollmentsHistoryTable />
    </div>
  );
}
