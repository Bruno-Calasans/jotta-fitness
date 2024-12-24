"use client";

import { Workout } from "@/components/counter/WorkoutItem";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";

export type WorkoutContext = {
  workouts: Workout[];
  addWorkout(workout: Workout): void;
  removeWorkout(workout: Workout): void;
  finishWorkout(workout: Workout): void;
  clearWorkouts(): void;
};

export const WorkoutContext = React.createContext<WorkoutContext>({
  workouts: [],
  addWorkout(workout) {},
  removeWorkout(workout) {},
  clearWorkouts() {},
  finishWorkout(workout) {},
});

type useWorkoutContextProps = {
  children: React.ReactNode;
};

export function WorkoutContextProvider({ children }: useWorkoutContextProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const addWorkout = (workout: Workout) => {
    console.log("add workout");
    setWorkouts((w) => [...w, workout]);
  };

  const removeWorkout = (workout: Workout) => {
    const filtedWorkouts = workouts.filter((w) => w.name != workout.name);
    setWorkouts(() => filtedWorkouts);
  };

  const finishWorkout = (workout: Workout) => {
    const updatedWorkouts = workouts.map((w) => {
      if (w.name === workout.name) {
        w.finished = true;
      }
      return w;
    });
    setWorkouts(updatedWorkouts);
  };

  const clearWorkouts = () => {
    setWorkouts([]);
  };

  return (
    <WorkoutContext
      value={{
        workouts,
        addWorkout,
        removeWorkout,
        clearWorkouts,
        finishWorkout,
      }}
    >
      {children}
    </WorkoutContext>
  );
}
