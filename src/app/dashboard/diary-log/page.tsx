"use client";

import DatePicker from "@/components/custom/DatePicker";
import LogTabs from "@/components/dashboard/DiaryLog/LogTabs";
import ContentContainer from "@/components/general/ContentContainer";
import { Input } from "@/components/ui/input";
import { useLogStore } from "@/store/logStore";

export default function DiaryLogPage() {
  const { selectedDate, setSelectedDate } = useLogStore();

  return (
    <ContentContainer>
      <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 flex-row">
        <p>Registro do Dia</p>
        <DatePicker value={selectedDate} onSelect={setSelectedDate} />
      </div>
      <LogTabs />
    </ContentContainer>
  );
}
