"use client";

import type { Workout } from "@/types/Workout";
import WorkoutItemActions from "./WorkoutItemActions";
import WorkoutItemContent from "./WorkoutItemContent";
import WorkoutItemContainer from "./WorkoutItemContainer";
import useWorkoutCounter from "@/components/counter/workout-item/use-workout-counter";

type WorkoutProps = {
  workout: Workout;
};

export default function WorkoutItem({ workout }: WorkoutProps) {
  useWorkoutCounter({ workout });
  return (
    <WorkoutItemContainer workout={workout}>
      <WorkoutItemContent workout={workout} />
      <WorkoutItemActions workout={workout} />
    </WorkoutItemContainer>
  );
}
