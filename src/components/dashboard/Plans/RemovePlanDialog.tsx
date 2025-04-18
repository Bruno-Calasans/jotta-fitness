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
import { Plan } from "@/types/Plan.type";
import { usePlanStore } from "@/store/planStore";
import useCustomToast from "@/hooks/use-custom-toast";

type RemovePlanDialogProps = {
  plan: Plan;
};

export default function RemovePlanDialog({ plan }: RemovePlanDialogProps) {
  const { successToast, errorToast } = useCustomToast();
  const { remove } = usePlanStore();

  const removePlanHandler = () => {
    try {
      remove(plan.id);
      successToast("Exclusão de Plano", "Plano removido com sucesso!");
      
    } catch (error) {
      errorToast("Exclusão de Plano", "Erro ao remover plano");
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
          <DialogTitle>Remover Plano</DialogTitle>
          <div>
            Tem certeza que deseja excluir o plano{" "}
            <span className="font-bold">"{plan.name}"</span>?
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
              onClick={removePlanHandler}
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
