"use client";

import { usePlanStore } from "@/store/planStore";
import Selector from "@/components/custom/Selector";
import type { Plan } from "@/types/Plan.type";

type PlanSelectorProps = {
  value: string;
  onValueChange: (value: string) => void;
  onItemSelected: (item: Plan) => void;
};

export function PlanSelector({
  value,
  onValueChange,
  onItemSelected,
}: PlanSelectorProps) {
  const { plans } = usePlanStore();

  const planData = plans.map((plan) => ({
    label: plan.name,
    value: plan.name,
    item: plan,
  }));

  return (
    <Selector
      itemAcessorKey="name"
      data={planData}
      value={value}
      onItemSelect={onItemSelected}
      onValueChange={onValueChange}
      placeholder="Selecione um plano"
    />
  );
}
