import useSound from "use-sound";
import { useEffect, useState } from "react";
import { useWorkoutStore } from "@/store/workoutStore";
import { BUSINESS_RULES } from "@/config/BusinessRules";
import type { Workout } from "@/types/Workout";

type UseWorkoutCounterProps = {
  workout: Workout;
};

export default function useWorkoutCounter(workout : Workout) {
  const [playSound] = useSound("/sounds/timeout.wav", { volume: 1 });
  const { selectedWorkout, finishWorkout, removeWorkout, updateWorkout } =
    useWorkoutStore();

  useEffect(() => {
    if (!workout.running || workout.id === selectedWorkout?.id) return;

    // Timeout
    if (workout.time <= BUSINESS_RULES.minTimeToTimeout && !workout.finished) {
      finishWorkout(workout.id);
      playSound({
        playbackRate: 1.1,
      });
    }

    // Remove workout automatically
    if (workout.finished && workout.time === BUSINESS_RULES.maxTimeAfterTimeout)
      removeWorkout(workout.id);

    const timer = setInterval(() => {
      let newTime = 0;
      // forward counter
      if (workout.finished) {
        newTime = workout.time + 1;
      }
      // backward counter
      else {
        newTime = workout.time - 1;
      }

      // Update workout time
      updateWorkout(workout.id, { time: newTime });

      // Run this code each ms of time
    }, BUSINESS_RULES.workoutTick);

    return () => clearInterval(timer);
  }, [workout.time, workout.running, selectedWorkout]);

  return null;
}
