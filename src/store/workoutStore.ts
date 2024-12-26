"use client";

import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import type { Workout } from "@/types/Workout";
import {
  compareByDateAsc,
  compareByDateDesc,
  compareByTimeAsc,
  compareByTimeDesc,
} from "./workoutStoreUtils";

interface WorkoutState {
  running: boolean;
  searchedWorkout: string;
  selectedWorkout: Workout | null;
  workouts: Workout[];
  selectWorkout(workout: Workout): void;
  unselectWorkout(): void;
  addWorkout(workout: Workout): void;
  removeWorkout(workout: Workout): void;
  editWorkout(workout: Workout, data: Partial<Workout>): void;
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
  sortWorkoutsByTime(order: "asc" | "desc"): void;
  updateWorkoutTime(id: string, time: number): void;
  updateSearchedWorkout(keyword: string): void;
  searchWorkouts(type: "ongoing" | "finished" | "all"): Workout[];
  playWorkout(id: string): void;
  stopWorkout(id: string): void;
}

const workoutStore = create<WorkoutState>()(
  devtools(
    persist(
      (set, get) => ({
        running: false,
        searchedWorkout: "",
        selectedWorkout: null,
        workouts: [],
        addWorkout(workout) {
          const sortedWorkouts = [...get().workouts, workout];
          set(() => ({ workouts: sortedWorkouts }));
        },
        removeWorkout(workout) {
          const filtedWorkouts = get().workouts.filter(
            (w) => w.id != workout.id
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
        clearFinishedWorkouts() {
          set(() => ({ workouts: get().getGoingOnWorkouts() }));
        },
        selectWorkout(workout) {
          set(() => ({ selectedWorkout: workout }));
        },
        unselectWorkout() {
          set(() => ({ selectedWorkout: null }));
        },
        updateWorkout(id, property, newValue) {
          const updatedWorkouts = get().workouts.map((w) => {
            if (w.id === id) {
              return { ...w, [property]: newValue };
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
        finishWorkout(workout) {
          const updatedWorkouts = get().workouts.map((w) => {
            if (w.id === workout.id) {
              return { ...w, finished: true };
            }
            return w;
          });
          set(() => ({ workouts: updatedWorkouts }));
        },
        updateWorkoutTime(id, time) {
          get().updateWorkout(id, "time", time);
        },
        updateSearchedWorkout(keyword) {
          set(() => ({ searchedWorkout: keyword }));
        },
        searchWorkouts(type) {
          const keyword = get().searchedWorkout;

          if (type == "ongoing") {
            const ongoingWorkouts = get().getGoingOnWorkouts();
            return keyword != ""
              ? ongoingWorkouts.filter((w) =>
                  w.name.toLowerCase().includes(keyword.toLowerCase())
                )
              : ongoingWorkouts;
          } else if (type == "finished") {
            const finishedWorkouts = get().getFinishedWorkouts();
            return keyword != ""
              ? finishedWorkouts.filter((w) =>
                  w.name.toLowerCase().includes(keyword.toLowerCase())
                )
              : finishedWorkouts;
          } else {
            const workouts = get().workouts;
            return keyword != ""
              ? workouts.filter((w) =>
                  w.name.toLowerCase().includes(keyword.toLowerCase())
                )
              : workouts;
          }
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
      }
    )
  )
);

export default workoutStore;
