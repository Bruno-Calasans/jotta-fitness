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
import { Adhesion } from "@/types/Adhesion.type";
import { useAdhesionStore } from "@/store/adhesionStore";
import useCustomToast from "@/hooks/use-custom-toast";

type RemoveAdhesionDialogProps = {
  adhesion: Adhesion;
};

export default function RemoveAdhesionDialog({
  adhesion,
}: RemoveAdhesionDialogProps) {
  const { successToast, errorToast } = useCustomToast();
  const { remove } = useAdhesionStore();

  const removeAdhesionHandler = () => {
    try {
      remove(adhesion.id);
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
          <DialogTitle>Remover Adesão</DialogTitle>
          <div>
            Tem certeza que deseja excluir a adesão do ano{" "}
            <span className="font-bold">"{adhesion.year}"</span>?
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
              onClick={removeAdhesionHandler}
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
