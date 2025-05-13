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
import useCustomToast from "@/hooks/use-custom-toast";
import { useLogStore } from "@/store/logStore";
import type { LossLog } from "@/types/Log.type";

type RemoveLossLogDialogProps = {
  lossLog: LossLog;
};

export default function RemoveLossLogDialog({
  lossLog,
}: RemoveLossLogDialogProps) {
  const logDb = useLogStore();
  const { successToast, errorToast } = useCustomToast();

  const removeLossLogHandler = () => {
    try {
      logDb.remove(lossLog.id);
      successToast(
        "Exclusão de Registro de Perda",
        "Registro removido com sucesso!"
      );
    } catch (error) {
      errorToast("Exclusão de Registro de Perda", "Erro ao remover registro");
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
          <DialogTitle>Remover Registro de Perda</DialogTitle>
          <div>
            Tem certeza que deseja excluir o registro de perda de{" "}
            <span className="font-bold text-orange-500">
              {lossLog.item.name}
            </span>{" "}
            do dia{" "}
            <span className="font-bold">
              {lossLog.createdAt.toLocaleDateString()}
            </span>
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
              onClick={removeLossLogHandler}
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
