import type { Expense } from "@/types/Expense.type";
import generateDefaultDbFields from "@/utils/generateDefaultDbFields";

export const EXPENSE_DATA: Expense[] = [
  {
    ...generateDefaultDbFields(),
    name: "Salário",
  },
  {
    ...generateDefaultDbFields(),
    name: "Conta de Luz",
  },
];
