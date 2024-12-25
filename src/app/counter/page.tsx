"use client";

import ContentContainer from "@/components/general/ContentContainer";
import WorkoutSearchBar from "@/components/counter/SearchBar";
import WorkoutList from "@/components/counter/WorkoutList";
import EditWorkoutDialog from "@/components/counter/dialogs/EditWorkoutDialog";
import CreateWorkoutDialog from "@/components/counter/dialogs/CreateWorkoutDialog";
import { useStore } from "zustand";
import workoutStore from "@/store/workoutStore";

export default function Counter() {
  const { selectedWorkout, searchWorkouts } = useStore(workoutStore);
  let onGoingWorkouts = searchWorkouts("ongoing");
  let finishedWorkouts = searchWorkouts("finished");

  return (
    <ContentContainer>
      <section className="flex flex-col gap-5 text-white m-2 bg-stone-800 p-5 rounded-sm ">
        {/* Title */}
        <div className="flex md:flex-row  justify-between items-center border-b-2 border-orange-500 p-2">
          <p className="text-3xl text-left font-bold">Contador de Treino</p>
          <CreateWorkoutDialog />
        </div>

        {/* Content */}
        <WorkoutSearchBar />
        <EditWorkoutDialog />
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-10 mt-5">
          {/* in progress workouts */}
          <WorkoutList
            title="Treinos em Andamento"
            workouts={onGoingWorkouts}
          />

          {/* finished workouts */}
          <WorkoutList
            title="Treinos Finalizados"
            workouts={finishedWorkouts}
          />
        </div>
      </section>
    </ContentContainer>
  );
}
