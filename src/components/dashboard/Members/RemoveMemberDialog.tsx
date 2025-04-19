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
import { Member } from "@/types/Member.type";
import { useMemberStore } from "@/store/memberStore";
import useCustomToast from "@/hooks/use-custom-toast";

type RemoveMemberDialogProps = {
  member: Member;
};

export default function RemoveMemberDialog({
  member,
}: RemoveMemberDialogProps) {
  const { successToast, errorToast } = useCustomToast();
  const { remove } = useMemberStore();

  const removeMemberHandler = () => {
    try {
      remove(member.id);
      successToast("Exclusão de Membro", "Membro removido com sucesso!");
    } catch (error) {
      errorToast("Exclusão de Membro", "Erro ao remover membro");
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
          <DialogTitle>Remover Membro</DialogTitle>
          <div>
            Tem certeza que deseja excluir o membro{" "}
            <span className="font-bold">"{member.name}"</span>?
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
              onClick={removeMemberHandler}
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
