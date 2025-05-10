import Selector from "@/components/custom/Selector";
import { useExpenseStore } from "@/store/expenseStore";
import { Expense } from "@/types/Expense.type";

type ExpenseSelectorProps = {
  value: string;
  onValueChange: (value: string) => void;
  onItemSelected: (item: Expense) => void;
};

export default function ExpenseSelector({
  value,
  onValueChange,
  onItemSelected,
}: ExpenseSelectorProps) {
  const { expenses } = useExpenseStore();

  const expenseTypeData = expenses.map((expense) => ({
    label: expense.name,
    value: expense.name,
    item: expense,
  }));

  return (
    <Selector
      value={value}
      data={expenseTypeData}
      itemAcessorKey="name"
      onValueChange={onValueChange}
      onItemSelect={onItemSelected}
      placeholder="Selecione uma Despesa"
    />
  );
}
