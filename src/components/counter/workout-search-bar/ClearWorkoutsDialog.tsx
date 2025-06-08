import { useWorkoutStore } from "@/store/workoutStore";
import RemoveDialog from "../../custom/dialogs/RemoveDialog";
import { Button } from "../../ui/button";
import { Trash2 } from "lucide-react";

export default function ClearWorkoutsDialog() {
  const { clearWorkouts } = useWorkoutStore();
  return (
    <RemoveDialog
      title="Excluir Treinamentos"
      removeBtn={
        <Button
          title="Limpar treinos"
          size="icon"
          className="bg-red-500 hover:bg-red-600"
        >
          <Trash2 />
        </Button>
      }
      onRemove={clearWorkouts}
    >
      <p>
        Todos os treinos (em andamento e finalizados) serão excluídos. Deseja
        continuar?
      </p>
    </RemoveDialog>
  );
}
