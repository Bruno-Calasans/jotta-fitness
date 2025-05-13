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
import { useMemberStore } from "@/store/memberStore";
import { Enrollment } from "@/types/Enrollment.type";

type RemoveEnrollmentDialogProps = {
  enrollment: Enrollment;
};

export default function RemoveEnrollmentDialog({
  enrollment,
}: RemoveEnrollmentDialogProps) {
  const { successToast, errorToast } = useCustomToast();
  const { selectedMember, removeEnrollment } = useMemberStore();

  if (!selectedMember) return null;

  const removeSubscriptionHandler = () => {
    try {
      removeEnrollment(selectedMember.id, enrollment.id);
      successToast("Desiscrição de Plano", "Plano desiscrito com sucesso!");
    } catch (error) {
      errorToast("Desiscrição de Plano", "Erro ao desiscrever do Plano!");
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
          <DialogTitle>Desiscrever</DialogTitle>
          <div>
            Tem certeza que deseja excluir a inscrição no plano{" "}
            <span className="font-bold text-orange-500">
              {enrollment.plan.name}
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
              onClick={removeSubscriptionHandler}
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
