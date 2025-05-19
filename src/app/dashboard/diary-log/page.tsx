"use client";

import DatePicker from "@/components/custom/others/DatePicker";
import DiaryReport from "@/components/custom/report/DiaryReport";
import LogTabs from "@/components/dashboard/diary-logs/LogTabs";
import ContentContainer from "@/components/custom/others/ContentContainer";
import { useLogStore } from "@/store/logStore";

export default function DiaryLogPage() {
  const { selectedDate, setSelectedDate } = useLogStore();

  return (
    <ContentContainer>
      <div>
        <DiaryReport />
        <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 flex-row">
          <p>Registro do Dia</p>
          <DatePicker value={selectedDate} onSelect={setSelectedDate} />
        </div>
      </div>
      <LogTabs />
    </ContentContainer>
  );
}
