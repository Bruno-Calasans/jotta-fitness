"use client";

import { Workout } from "@/components/counter/WorkoutItem";
import React, { useState } from "react";

export type WorkoutContext = {
  selectedWorkout: Workout | null;
  workouts: Workout[];
  selectWorkout(workout: Workout): void;
  deselectWorkout(): void;
  addWorkout(workout: Workout): void;
  removeWorkout(workout: Workout): void;
  editWorkout(workout: Workout, newWorkoutData: Partial<Workout>): void;
  finishWorkout(workout: Workout): void;
  clearWorkouts(): void;
  clearFinishedWorkouts(): void;
  getGoingOnWorkouts(): Workout[];
  getFinishedWorkouts(): Workout[];
};

export const WorkoutContext = React.createContext<WorkoutContext>({
  selectedWorkout: null,
  workouts: [],
  selectWorkout(workout) {},
  deselectWorkout() {},
  addWorkout(workout) {},
  removeWorkout(workout) {},
  editWorkout(workout, newWorkoutData) {},
  clearWorkouts() {},
  finishWorkout(workout) {},
  clearFinishedWorkouts() {},
  getFinishedWorkouts() {
    return [];
  },
  getGoingOnWorkouts() {
    return [];
  },
});

type useWorkoutContextProps = {
  children: React.ReactNode;
};

export function WorkoutContextProvider({ children }: useWorkoutContextProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const selectWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
  };

  const deselectWorkout = () => {
    setSelectedWorkout(null);
  };

  const editWorkout = (workout: Workout, newWorkoutData: Partial<Workout>) => {
    const updatedWorkouts = workouts.map((w) => {
      if (w.id === workout.id) {
        const newWorkout = { ...workout, ...newWorkoutData };
        return newWorkout;
      }
      return w;
    });
    setWorkouts(updatedWorkouts);
  };

  const addWorkout = (workout: Workout) => {
    setWorkouts((w) => [...w, workout]);
  };

  const removeWorkout = (workout: Workout) => {
    const filtedWorkouts = workouts.filter((w) => w.id != workout.id);
    setWorkouts(filtedWorkouts);
  };

  const finishWorkout = (workout: Workout) => {
    const updatedWorkouts = workouts.map((w) => {
      if (w.id === workout.id) {
        return { ...w, finished: true };
      }
      return w;
    });
    setWorkouts(updatedWorkouts);
  };

  const clearWorkouts = () => {
    setWorkouts([]);
  };

  const clearFinishedWorkouts = () => {
    setWorkouts(getGoingOnWorkouts());
  };

  const getGoingOnWorkouts = () => workouts.filter((w) => !w.finished);

  const getFinishedWorkouts = () => workouts.filter((w) => w.finished);

  return (
    <WorkoutContext
      value={{
        selectedWorkout,
        workouts,
        addWorkout,
        removeWorkout,
        clearWorkouts,
        finishWorkout,
        selectWorkout,
        deselectWorkout,
        editWorkout,
        getGoingOnWorkouts,
        getFinishedWorkouts,
        clearFinishedWorkouts,
      }}
    >
      {children}
    </WorkoutContext>
  );
}
