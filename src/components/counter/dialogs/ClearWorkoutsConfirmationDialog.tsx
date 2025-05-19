import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import workoutStore from "@/store/workoutStore";
import { useStore } from "zustand";

type ClearWorkoutsConfirmationDialogProps = {
  children: React.ReactNode;
};

export default function ClearWorkoutsConfirmationDialog({
  children,
}: ClearWorkoutsConfirmationDialogProps) {
  const { clearWorkouts } = useStore(workoutStore);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle className="border-b-2 border-orange-500">
            Deseja excluir todos os treinos?
          </DialogTitle>
          <DialogDescription>
            Todos os treinos (em andamento e finalizados) serão excluídos.
          </DialogDescription>
          <div className="flex gap-1 flex-1 justify-end">
            <DialogClose asChild>
              <Button
                onClick={clearWorkouts}
                size="sm"
                className="bg-red-500 hover:bg-red-600"
              >
                Confirmar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600">
                Cancelar
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
