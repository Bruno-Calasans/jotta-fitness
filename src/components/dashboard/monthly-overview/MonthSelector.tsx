import Selector from "@/components/custom/others/Selector";
import { MonthData, MONTHS } from "@/data/MONTHS_DATA";

type MonthSelectorProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  onItemSelected: (item: MonthData) => void;
};

export default function MonthSelector({
  value,
  onValueChange,
  onItemSelected,
}: MonthSelectorProps) {
  const monthData = MONTHS.map((month) => ({
    label: month.name,
    value: month.shortName,
    item: month,
  }));

  const currentMonth = MONTHS.find((m) => m.value === new Date().getMonth());

  return (
    <Selector
      data={monthData}
      value={value}
      onValueChange={onValueChange}
      onItemSelect={onItemSelected}
      itemAcessorKey="shortName"
      placeholder="Escolha um mês"
      defaultValue={currentMonth?.shortName}
    />
  );
}
