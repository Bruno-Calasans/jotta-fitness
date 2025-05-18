"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnrollmentLogTab from "./enrollment-log/EnrollmentLogTab";
import PlanDiaryLogTab from "./plan-diary-log/PlanDiarylogTab";
import PurchaseLogTab from "./purchase-log/PurchaseLogTab";
import LossLogTab from "./loss-log/LossLogTab";
import AdhesionLogTab from "./adhesion-log/AdhesionLogTab";

const tabData = [
  {
    label: "Inscrições",
    value: "enrollment",
    content: <EnrollmentLogTab />,
  },
  {
    label: "Diária",
    value: "plan-diary",
    content: <PlanDiaryLogTab />,
  },
  {
    label: "Adesão",
    value: "adhesion",
    content: <AdhesionLogTab />,
  },
  {
    label: "Compras",
    value: "purchase",
    content: <PurchaseLogTab />,
  },
  {
    label: "Perdas",
    value: "loss",
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
