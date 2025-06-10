"use client";

import useCustomToast from "@/hooks/use-custom-toast";
import RemoveDialog from "@/components/custom/dialogs/RemoveDialog";
import { useWorkoutStore } from "@/store/workoutStore";
import type { Workout } from "@/types/Workout";
import { useState } from "react";

type RemoveWorkoutDialogProps = {
  workout: Workout;
};

export default function RemoveWorkoutDialog({
  workout,
}: RemoveWorkoutDialogProps) {
  const { successToast, errorToast } = useCustomToast();
  const { removeWorkout, playWorkout, stopWorkout } = useWorkoutStore();

  const removeWorkoutHandler = () => {
    try {
      removeWorkout(workout.id);
      successToast(
        "Exclusão de treinamento",
        "Treinamento removido com sucesso!"
      );
    } catch (error) {
      errorToast("Exclusão de treinamento", "Erro ao remover treinamento");
    }
  };

  const openChangeHandler = (open: boolean) => {
    if (!open) playWorkout(workout.id);
    else stopWorkout(workout.id);
  };

  return (
    <RemoveDialog
      title="Remover treinamento"
      onOpenChange={openChangeHandler}
      onRemove={removeWorkoutHandler}
    >
      <div>
        Tem certeza que deseja excluir o treinamento{" "}
        <span className="font-bold text-orange-500">{workout.name}</span>?
      </div>
    </RemoveDialog>
  );
}
