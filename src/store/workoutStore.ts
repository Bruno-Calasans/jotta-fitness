"use client";

import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import {
  compareByDateAsc,
  compareByDateDesc,
  compareByTimeAsc,
  compareByTimeDesc,
} from "./workoutStoreUtils";
import type { Workout } from "@/types/Workout";
import createWorkout from "@/utils/createWorkout";

interface WorkoutState {
  running: boolean;
  searchedWorkout: string;
  selectedWorkout: Workout | null;
  workouts: Workout[];
  addWorkout(input: Partial<Workout>): void;
  removeWorkout(workoutId: string): void;
  editWorkout(workout: Workout, data: Partial<Workout>): void;
  updateWorkout(id: string, input: Partial<Workout>): void;
  finishWorkout(workoutId: string): void;
  clearWorkouts(): void;
  getGoingOnWorkouts(): Workout[];
  getFinishedWorkouts(): Workout[];
  sortWorkoutsByDate(order: "asc" | "desc"): void;
  sortWorkoutsByTime(order: "asc" | "desc"): void;
  setSearchedWorkout(keyword: string): void;
  searchWorkouts(type: "ongoing" | "finished" | "all"): Workout[];
  playWorkout(id: string): void;
  stopWorkout(id: string): void;
}

export const useWorkoutStore = create<WorkoutState>()(
  devtools(
    persist(
      (set, get) => ({
        running: false,
        searchedWorkout: "",
        selectedWorkout: null,
        workouts: [],
        addWorkout(input) {
          const workout = createWorkout(input);
          set(() => ({ workouts: [...get().workouts, workout] }));
        },
        removeWorkout(workoutId) {
          const filtedWorkouts = get().workouts.filter(
            (w) => w.id != workoutId,
          );
          set(() => ({ workouts: filtedWorkouts }));
        },
        editWorkout(workout, data) {
          const updatedWorkouts = get().workouts.map((w) => {
            if (w.id === workout.id) {
              const newWorkout: Workout = { ...workout, ...data };
              return newWorkout;
            }
            return w;
          });
          set(() => ({ workouts: updatedWorkouts }));
        },
        clearWorkouts() {
          set(() => ({ workouts: [] }));
        },
        getGoingOnWorkouts() {
          return get().workouts.filter((w) => !w.finished);
        },
        getFinishedWorkouts() {
          return get().workouts.filter((w) => w.finished);
        },
        updateWorkout(id, input) {
          const updatedWorkouts = get().workouts.map((w) => {
            if (w.id === id) {
              return { ...w, ...input };
            }
            return w;
          });
          set(() => ({ workouts: updatedWorkouts }));
        },
        sortWorkoutsByDate(order) {
          if (order == "asc") {
            const sortedWorkouts = get().workouts.sort(compareByDateAsc);
            set(() => ({ workouts: sortedWorkouts }));
          } else {
            const sortedWorkouts = get().workouts.sort(compareByDateDesc);
            set(() => ({ workouts: sortedWorkouts }));
          }
        },
        sortWorkoutsByTime(order) {
          if (order == "asc") {
            const sortedWorkouts = get().workouts.sort(compareByTimeAsc);
            set(() => ({ workouts: sortedWorkouts }));
          } else {
            const sortedWorkouts = get().workouts.sort(compareByTimeDesc);
            set(() => ({ workouts: sortedWorkouts }));
          }
        },
        finishWorkout(workoutId) {
          const updatedWorkouts = get().workouts.map((w) => {
            if (w.id === workoutId) {
              return { ...w, finished: true };
            }
            return w;
          });
          set(() => ({ workouts: updatedWorkouts }));
        },
        setSearchedWorkout(keyword) {
          set(() => ({ searchedWorkout: keyword }));
        },
        searchWorkouts(type) {
          const keyword = get().searchedWorkout;
          let workouts = get().workouts;

          if (type == "ongoing") workouts = get().getGoingOnWorkouts();
          if (type === "finished") workouts = get().getFinishedWorkouts();

          return keyword != ""
            ? workouts.filter((w) =>
                w.name.toLowerCase().includes(keyword.toLowerCase()),
              )
            : workouts;
        },
        playWorkout(id) {
          const updatedWorkouts = get().workouts.map((w) => {
            if (w.id === id) {
              return { ...w, running: true };
            }
            return w;
          });
          set(() => ({ workouts: updatedWorkouts }));
        },
        stopWorkout(id) {
          const updatedWorkouts = get().workouts.map((w) => {
            if (w.id === id) {
              console.log(get().running);
              return { ...w, running: false };
            }
            return w;
          });
          set(() => ({ workouts: updatedWorkouts }));
        },
      }),
      {
        name: "workout-storage",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);
