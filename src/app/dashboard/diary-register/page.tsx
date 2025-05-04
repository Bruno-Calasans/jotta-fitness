import RegisterTabs from "@/components/dashboard/DiaryRegister/LogTabs";
import ContentContainer from "@/components/general/ContentContainer";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

type DiaryRegisterPageProps = {};

export default function DiaryRegisterPage({}: DiaryRegisterPageProps) {
  return (
    <ContentContainer>
      <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2 flex-row">
        <p>Registro Diário</p>
        {/* <CreatePlanDialog /> */}
        {/* <Input type="date" /> */}
      </div>
      {/* <Calendar
        mode="single"
        selected={new Date()}
        className="flex flex-1 justify-center"
        classNames={{
          day_today: "bg-orange-500",
        }}
      /> */}
      <RegisterTabs />
    </ContentContainer>
  );
}
