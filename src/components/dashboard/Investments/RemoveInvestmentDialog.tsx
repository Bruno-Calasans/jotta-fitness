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
import { Investment } from "@/types/Investment.type";
import { useInvestmentStore } from "@/store/investmentStore";
import useCustomToast from "@/hooks/use-custom-toast";

type RemoveInvestmentDialogProps = {
  investment: Investment;
};

export default function RemoveInvestmentDialog({
  investment,
}: RemoveInvestmentDialogProps) {
  const { successToast, errorToast } = useCustomToast();
  const { remove } = useInvestmentStore();

  const removeInvestmentHandler = () => {
    try {
      remove(investment.id);
      successToast(
        "Exclusão de Investimento",
        "Investimento removido com sucesso!",
      );
    } catch (error) {
      errorToast("Exclusão de Investimento", "Erro ao remover investimento");
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
          <DialogTitle>Remover Investimento</DialogTitle>
          <div>
            Tem certeza que deseja excluir o investimento{" "}
            <span className="font-bold text-orange-500">{investment.name}</span>
            ?
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
              onClick={removeInvestmentHandler}
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
