import { Workout } from "@/types/Workout";
import { Button } from "../../ui/button";
import { Pause, Play } from "lucide-react";
import { useWorkoutStore } from "@/store/workoutStore";

type PlayPauseWorkoutItemProps = {
  workout: Workout;
};

export default function PlayPauseWorkoutItem({
  workout,
}: PlayPauseWorkoutItemProps) {
  const { playWorkout, stopWorkout } = useWorkoutStore();

  if (workout.running) {
    return (
      <Button
        variant="ghost"
        className="w-full flex items-center justify-start gap-1"
        onClick={() => stopWorkout(workout.id)}
      >
        <Pause className="h-4 w-4" />
        Pausar
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      className="w-full flex items-center justify-start gap-1"
      onClick={() => playWorkout(workout.id)}
    >
      <Play className="h-4 w-4" />
      Iniciar
    </Button>
  );
}
