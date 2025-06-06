import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import useCustomToast from "@/hooks/use-custom-toast";
import { useLogStore } from "@/store/logStore";
import { useMemberStore } from "@/store/memberStore";
import type { AdhesionLog } from "@/types/Log.type";

type RemoveAdhesionLogDialogProps = {
  adhesionLog: AdhesionLog;
};

export default function RemoveAdhesionLogDialog({
  adhesionLog,
}: RemoveAdhesionLogDialogProps) {
  const logDb = useLogStore();
  const memberDb = useMemberStore();
  const { successToast, errorToast } = useCustomToast();

  const removeAdhesionLogHandler = () => {
    try {
      memberDb.removeAdhesionPayment(
        adhesionLog.member.id,
        adhesionLog.adhesionPayment.id,
      );
      logDb.remove(adhesionLog.id);
      successToast(
        "Exclusão de Registro de Adesão",
        "Registro removido com sucesso!",
      );
    } catch (error) {
      errorToast("Exclusão de Registro de Adesão", "Erro ao remover registro");
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
          Excluir
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Registro de Adesão</DialogTitle>
          <div>
            Tem certeza que deseja excluir o registro de adesão do usuário{" "}
            <span className="font-bold text-orange-500">
              {adhesionLog.member.name}{" "}
            </span>
            do ano{" "}
            <span className="font-bold">{adhesionLog.adhesion.year}</span>?
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
              onClick={removeAdhesionLogHandler}
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
