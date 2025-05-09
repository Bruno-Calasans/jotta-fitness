"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnrollmentLogTab from "./Enrollment/EnrollmentLogTab";
import PlanDiaryLogTab from "./PlanDiary/PlanDiarylogTab";
import PurchaseLogTab from "./Purchases/PurchaseLogTab";
import LossLogTab from "./Loss/LossLogTab";

const tabData = [
  {
    value: "enrollment-register",
    label: "Inscrições",
    content: <EnrollmentLogTab />,
  },
  {
    value: "plan-diary-register",
    label: "Diária",
    content: <PlanDiaryLogTab />,
  },
  {
    value: "adhesion-payment-register",
    label: "Adesão",
    content: <p>Ainda não disponível</p>,
  },
  {
    value: "purchase-registers",
    label: "Produtos",
    content: <PurchaseLogTab />,
  },
  {
    value: "loss-register",
    label: "Perdas",
    content: <LossLogTab />,
  },
];

export default function LogTabs() {
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

      {tabData.map((data, index) => (
        <TabsContent key={data.value + index} value={data.value}>
          {data.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
