import useCustomToast from "@/hooks/use-custom-toast";
import RemoveDialog from "@/components/custom/dialogs/RemoveDialog";
import type { Workout } from "@/types/Workout";
import { useWorkoutStore } from "@/store/workoutStore";

type RemoveWorkoutDialogProps = {
  workout: Workout;
};

export default function RemoveWorkoutDialog({
  workout,
}: RemoveWorkoutDialogProps) {
  const { successToast, errorToast } = useCustomToast();
  const { removeWorkout } = useWorkoutStore();

  const removeWorkoutHandler = () => {
    try {
      removeWorkout(workout.id);
      successToast(
        "Exclusão de treinamento",
        "Treinamento removido com sucesso!",
      );
    } catch (error) {
      errorToast("Exclusão de treinamento", "Erro ao remover treinamento");
    }
  };

  return (
    <RemoveDialog title="Remover treinamento" onRemove={removeWorkoutHandler}>
      <div>
        Tem certeza que deseja excluir o treinamento{" "}
        <span className="font-bold text-orange-500">{workout.name}</span>?
      </div>
    </RemoveDialog>
  );
}
