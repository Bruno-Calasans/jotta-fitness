"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlanMemberTab from "./Plans/PlanMemberTab";

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

export default function MemberTabs() {
  return (
    <Tabs defaultValue={tabData[0].value}>
      <TabsList className="w-full mb-2 gap-2 bg-stone-800 text-white p-4">
        {tabData.map((tab) => (
          <TabsTrigger
            key={tab.value}
            className="w-full bg-black font-bold data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all delay-75 shadow-sm "
            value={tab.value}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={tabData[0].value}>
        <PlanMemberTab />
      </TabsContent>
    </Tabs>
  );
}
