import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Workout } from "@/types/Workout";
import { useWorkoutStore } from "@/store/workoutStore";
import WorkoutForm from "../WorkoutForm";

type EditWorkoutModalProps = {
  workout: Workout;
};

export default function EditWorkoutDialog({ workout }: EditWorkoutModalProps) {
  const [open, setOpen] = useState(false);
  const { playWorkout, stopWorkout, setSelectedWorkout, sortWorkoutsByTime } =
    useWorkoutStore();

  const submitFormHandler = (success: boolean) => {
    if (success) {
      setOpen(false);
      sortWorkoutsByTime("asc");
    }
  };

  const openChangeHandler = (value: boolean) => {
    setOpen(value);
    if (value) {
      setSelectedWorkout(workout);
      stopWorkout(workout.id);
    } else {
      playWorkout(workout.id);
      setSelectedWorkout(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={openChangeHandler}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start gap-1"
        >
          <Pencil className="h-4 w-4" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle>Editar Treinamento</DialogTitle>
        </DialogHeader>
        <WorkoutForm onSubmit={submitFormHandler} />
      </DialogContent>
    </Dialog>
  );
}
