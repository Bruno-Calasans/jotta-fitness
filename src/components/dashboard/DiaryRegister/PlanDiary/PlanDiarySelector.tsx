import Selector from "@/components/custom/Selector";
import { usePlanStore } from "@/store/planStore";
import { Plan } from "@/types/Plan.type";

type PlanDiarySelectorProps = {
  value: string;
  onValueChange: (value: string) => void;
  onItemSelected: (item: Plan) => void;
};

export default function PlanDiarySelector({
  value,
  onValueChange,
  onItemSelected,
}: PlanDiarySelectorProps) {
  const { plans } = usePlanStore();

  const plandiaryTypeData = plans.map((plan) => ({
    label: `R$${plan.diary} (${plan.name})`,
    value: plan.name,
    item: plan,
  }));

  return (
    <Selector
      value={value}
      data={plandiaryTypeData}
      itemAcessorKey="name"
      onValueChange={onValueChange}
      onItemSelect={onItemSelected}
      placeholder="Selecione a diária"
    />
  );
}
