"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlanMemberTab from "./enrollments/EnrollmentTab";
import PurchasesTab from "./purchases/PurchasesTab";

const tabData = [
  {
    value: "subscriptions",
    label: "Inscrições",
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
            className="w-full bg-orange-400 font-bold data-[state=active]:bg-orange-600 data-[state=active]:text-white transition-all delay-75 shadow-sm "
            value={tab.value}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={tabData[0].value}>
        <PlanMemberTab />
      </TabsContent>

      <TabsContent value={tabData[1].value}>
        <PurchasesTab />
      </TabsContent>

      <TabsContent value={tabData[2].value}>
        <p>Ainda não disponível</p>
      </TabsContent>

      <TabsContent value={tabData[3].value}>
        <p>Ainda não disponível</p>
      </TabsContent>

      <TabsContent value={tabData[4].value}>
        <p>Ainda não disponível</p>
      </TabsContent>
    </Tabs>
  );
}
