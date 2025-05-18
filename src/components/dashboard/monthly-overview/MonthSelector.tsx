import Selector from "@/components/custom/others/Selector";
import { MonthData, MONTHS } from "@/data/MONTHS_DATA";

type MonthSelectorProps = {
  value: string;
  onValueChange: (value: string) => void;
  onItemSelected: (item: MonthData) => void;
};

export default function MonthSelector({
  value,
  onValueChange,
  onItemSelected,
}: MonthSelectorProps) {
  const monthData = MONTHS.map((month) => ({
    label: month.shortName,
    value: month.name,
    item: month,
  }));

  return (
    <Selector
      data={monthData}
      value={value}
      onValueChange={onValueChange}
      onItemSelect={onItemSelected}
      itemAcessorKey="name"
      placeholder="Escolha um mês"
    />
  );
}
