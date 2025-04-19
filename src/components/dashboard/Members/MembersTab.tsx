import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlanMemberTab from "./Plans/PlanMemberTab";
import { Member } from "@/types/Member.type";

const tabData = [
  {
    value: "plan",
    label: "Plano",
  },
  {
    value: "purchases",
    label: "Compras",
  },
  {
    value: "evaluations",
    label: "Avaliação Antropométrica",
  },
  {
    value: "train",
    label: "Treinamento",
  },
  {
    value: "personal",
    label: "Informações Pessoais",
  },
];

type MembersTabProps = {
  member: Member;
};

export default function MembersTab({ member }: MembersTabProps) {
  return (
    <Tabs defaultValue={tabData[0].value}>
      <TabsList className="w-full mb-2">
        {tabData.map((tab) => (
          <TabsTrigger key={tab.value} className="w-full" value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={tabData[0].value}>
        <PlanMemberTab member={member} />
      </TabsContent>
    </Tabs>
  );
}
