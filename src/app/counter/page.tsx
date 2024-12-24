"use client";

import ContentContainer from "@/components/general/ContentContainer";
import WorkoutSearchBar from "@/components/counter/SearchBar";
import WorkoutList from "@/components/counter/WorkoutList";
import CreateWorkout from "@/components/counter/CreateWorkout";
import { WorkoutContext } from "@/components/counter/context/WorkoutContext";
import { useContext } from "react";

type CounterProps = {};

export default function Counter({}: CounterProps) {
  const { workouts } = useContext(WorkoutContext);

  const onGoingWorkouts = workouts.filter((w) => !w.finished);
  const finishedWorkouts = workouts.filter((w) => w.finished);

  console.log(workouts);

  return (
    <ContentContainer>
      <section className="flex flex-col gap-5 text-white m-2 bg-stone-800 p-5 rounded-sm">
        {/* Title */}
        <div className="flex justify-between border-b-2 border-orange-500 p-1">
          <p className="text-4xl font-bol">Contador de Treino</p>
          <CreateWorkout />
        </div>

        {/* Content */}
        <WorkoutSearchBar />
        <div className="grid grid-cols-2 gap-10 mt-5">
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
