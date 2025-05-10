"use client";

import { DatePicker } from "@/components/custom/DatePicker";
import LogTabs from "@/components/dashboard/DiaryRegister/LogTabs";
import ContentContainer from "@/components/general/ContentContainer";
import { useLogStore } from "@/store/logStore";

export default function DiaryRegisterPage() {
  const { selectedDate, setSelectedDate } = useLogStore();

  return (
    <ContentContainer>
      <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 flex-row">
        <p>Registro do Dia</p>
        <DatePicker
          selected={selectedDate}
          onSelect={setSelectedDate}
          toDate={new Date()}
        />
      </div>
      <LogTabs />
    </ContentContainer>
  );
}
