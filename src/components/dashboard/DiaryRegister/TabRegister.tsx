"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnrollmentRegisterTab from "./EnrollmentRegisterTab";
// import PlanRegisterTab from "./Enrollments/EnrollmentTab";
// import PurchasesTab from "./Purchases/PurchasesTab";

const tabData = [
  {
    value: "enrollment-register",
    label: "Inscrições",
  },
  {
    value: "plan-diary-register",
    label: "Diária",
  },
  {
    value: "adhesion-payment-register",
    label: "Adesão",
  },
  {
    value: "purchase-registers",
    label: "Produtos",
  },
  {
    value: "loss-register",
    label: "Perdas",
  },
];

export default function RegisterTabs() {
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
        <EnrollmentRegisterTab />
      </TabsContent>

      <TabsContent value={tabData[1].value}>
        <p>Ainda não disponível</p>
      </TabsContent>

      <TabsContent value={tabData[2].value}>
        <p>Ainda não disponível</p>
      </TabsContent>
      <TabsContent value={tabData[3].value}>
        <p>Ainda não disponível</p>
      </TabsContent>
    </Tabs>
  );
}
