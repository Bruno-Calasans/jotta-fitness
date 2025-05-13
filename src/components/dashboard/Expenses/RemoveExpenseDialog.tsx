import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Trash } from "lucide-react";
  import { Expense } from "@/types/Expense.type";
  import { useExpenseStore } from "@/store/expenseStore";
  import useCustomToast from "@/hooks/use-custom-toast";
  
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
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-start gap-1"
          >
            <Trash className="h-4 w-4" />
            Remover
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remover Despesa</DialogTitle>
            <div>
              Tem certeza que deseja excluir a despesa{" "}
              <span className="font-bold text-orange-500">{expense.name}</span>?
            </div>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="bg-stone-500 hover:bg-stone-600 transition-all"
                type="button"
              >
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={removeExpenseHandler}
                className="bg-red-500 hover:bg-red-600 transition-all"
                type="submit"
              >
                Excluir
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  