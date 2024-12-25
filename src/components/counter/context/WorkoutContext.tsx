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
  updateWorkout(
    id: string,
    property: keyof Workout,
    newValue: Workout[keyof Workout]
  ): void;
  sortWorkoutsByDate(order: "asc" | "desc"): void;
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
  updateWorkout(id, property, newValue) {},
  sortWorkoutsByDate(order) {},
});

const compareByDescDate = (workoutA: Workout, workoutB: Workout) => {
  if (workoutA.createdAt < workoutB.createdAt) {
    return -1;
  }
  if (workoutA.createdAt > workoutB.createdAt) {
    return 1;
  }
  return 0;
};

const compareByAscDate = (workoutA: Workout, workoutB: Workout) => {
  if (workoutA.createdAt < workoutB.createdAt) {
    return 1;
  }
  if (workoutA.createdAt > workoutB.createdAt) {
    return -1;
  }
  return 0;
};

const compareByTime = (workoutA: Workout, workoutB: Workout) => {
  if (workoutA.time < workoutB.time) {
    return -1;
  }
  if (workoutA.time > workoutB.time) {
    return 1;
  }
  return 0;
};

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
    const sortedWorkouts = [...workouts, workout];
    setWorkouts(sortedWorkouts);
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

  const updateWorkout = (
    id: string,
    property: keyof Workout,
    newValue: Workout[keyof Workout]
  ) => {
    const updatedWorkouts = workouts.map((w) => {
      if (w.id === id) {
        return { ...w, [property]: newValue };
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

  const sortWorkoutsByDate = (order: "asc" | "desc") => {
    if (order == "asc") {
      const sortedWorkouts = workouts.sort(compareByAscDate);
      setWorkouts(sortedWorkouts);
    } else {
      const sortedWorkouts = workouts.sort(compareByDescDate);
      setWorkouts(sortedWorkouts);
    }
  };

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
        updateWorkout,
        sortWorkoutsByDate,
      }}
    >
      {children}
    </WorkoutContext>
  );
}
