"use client";

import ContentContainer from "@/components/custom/others/ContentContainer";
import WorkoutSearchBar from "@/components/counter/workout-search-bar/WorkoutSearchBar";
import WorkoutList from "@/components/counter/WorkoutList";
import CreateWorkoutDialog from "@/components/counter/CreateWorkoutDialog";
import { useWorkoutStore } from "@/store/workoutStore";

export default function Counter() {
  const { searchWorkouts } = useWorkoutStore();
  const onGoingWorkouts = searchWorkouts("ongoing");
  const finishedWorkouts = searchWorkouts("finished");

  return (
    <ContentContainer>
      <section className="flex flex-col gap-5 text-white m-6 bg-stone-800 p-2 rounded-sm ">
        {/* Title */}
        <div className="flex md:flex-row  justify-between items-center border-b-2 border-orange-500 p-2">
          <p className="text-3xl text-left font-bold">Contador de Treino</p>
          <CreateWorkoutDialog />
        </div>

        {/* Content */}
        <WorkoutSearchBar />

        {/* Workouts Area */}
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-10 mt-4">
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
