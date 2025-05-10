import Selector from "@/components/custom/Selector";
import { useInvestmentStore } from "@/store/investmentStore";
import { Investment } from "@/types/Investment.type";

type InvestmentSelectorProps = {
  value: string;
  onValueChange: (value: string) => void;
  onItemSelected: (item: Investment) => void;
};

export default function InvestmentSelector({
  value,
  onValueChange,
  onItemSelected,
}: InvestmentSelectorProps) {
  const { investments } = useInvestmentStore();

  const investmentTypeData = investments.map((investment) => ({
    label: investment.name,
    value: investment.name,
    item: investment,
  }));

  return (
    <Selector
      value={value}
      data={investmentTypeData}
      itemAcessorKey="name"
      onValueChange={onValueChange}
      onItemSelect={onItemSelected}
      placeholder="Selecione um Investmento"
    />
  );
}
