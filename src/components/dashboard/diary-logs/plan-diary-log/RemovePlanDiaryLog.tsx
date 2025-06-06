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
import { Log } from "@/types/Log.type";
import { useMemberStore } from "@/store/memberStore";

type RemovePlanDiaryLogDialogProps = {
  planDiaryLog: Log & { type: "plan-diary" };
};

export default function RemovePlanDiaryLogDialog({
  planDiaryLog,
}: RemovePlanDiaryLogDialogProps) {
  const logDb = useLogStore();
  const memberDb = useMemberStore();
  const { successToast, errorToast } = useCustomToast();

  const removePlanDiaryLogHandler = () => {
    try {
      // Registered member
      if (planDiaryLog.member)
        memberDb.removeDiary(planDiaryLog.member.id, planDiaryLog.planDiary.id);
      logDb.remove(planDiaryLog.id);
      successToast(
        "Exclusão de Registro de Diária",
        "Registro removido com sucesso!",
      );
    } catch (error) {
      errorToast(
        "Exclusão de Registro de Diária",
        "Erro ao remover registro de diária",
      );
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
          <DialogTitle>Remover Inscrição</DialogTitle>
          <div>Tem certeza que deseja excluir o registro desta diária?</div>
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
              onClick={removePlanDiaryLogHandler}
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
