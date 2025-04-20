import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePlanStore } from "@/store/planStore";
import { Plan } from "@/types/Plan.type";

type PlanSelectorProps = {
  value: string;
  defaultValue: string;
  onValueChange: (value: string) => void;
  onSelected: (plan: Plan) => void;
};

export function PlanSelector({
  value,
  defaultValue,
  onValueChange,
  onSelected,
}: PlanSelectorProps) {
  const { plans, getByName } = usePlanStore();

  const changeHandler = (value: string) => {
    const plan = getByName(value)!;
    onValueChange(value);
    onSelected(plan);
  };

  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      onValueChange={changeHandler}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione um plano" />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          {plans.map((plan) => (
            <SelectItem key={plan.id} value={plan.name}>
              {plan.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
