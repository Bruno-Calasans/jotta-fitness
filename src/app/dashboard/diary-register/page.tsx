import RegisterTabs from "@/components/dashboard/DiaryRegister/TabRegister";
import ContentContainer from "@/components/general/ContentContainer";
import { Calendar } from "@/components/ui/calendar";

type DiaryRegisterPageProps = {};

export default function DiaryRegisterPage({}: DiaryRegisterPageProps) {
  return (
    <ContentContainer>
      <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2">
        <p>Registro Diário</p>
        {/* <CreatePlanDialog /> */}
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
