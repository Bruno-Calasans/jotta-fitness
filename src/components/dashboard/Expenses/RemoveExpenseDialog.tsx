import { Expense } from "@/types/Expense.type";
import { useExpenseStore } from "@/store/expenseStore";
import useCustomToast from "@/hooks/use-custom-toast";
import RemoveDialog from "@/components/custom/dialogs/RemoveDialog";

type RemoveExpenseDialogProps = {
  expense: Expense;
};

export default function RemoveExpenseDialog({
  expense,
}: RemoveExpenseDialogProps) {
  const { successToast, errorToast } = useCustomToast();
  const { remove } = useExpenseStore();

  const removeExpenseHandler = () => {
    try {
      remove(expense.id);
      successToast("Exclusão de Despesa", "Despesa removido com sucesso!");
    } catch (error) {
      errorToast("Exclusão de Despesa", "Erro ao remover despesa");
    }
  };

  return (
    <RemoveDialog title="Remove Despesa" onRemove={removeExpenseHandler}>
      <div>
        Tem certeza que deseja excluir a despesa{" "}
        <span className="font-bold text-orange-500">{expense.name}</span>?
      </div>
    </RemoveDialog>
  );
}
