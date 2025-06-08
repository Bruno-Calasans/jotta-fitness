import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";
import { useWorkoutStore } from "@/store/workoutStore";
import ClearWorkoutsDialog from "./ClearWorkoutsDialog";
import SortWorkoutByDateButton from "./SortWorkoutByDateButton";
import SortWorkoutByTimeButton from "./SortWorkoutByTimeButton";

export default function WorkoutSearchBar() {
  const { searchedWorkout, setSearchedWorkout } = useWorkoutStore();

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchedWorkout(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 md:flex-row sm:flex-col">
        <Input
          className="bg-white text-orange-600 font-bold"
          type="search"
          placeholder="Pesquise por um nome"
          value={searchedWorkout}
          onChange={searchHandler}
        />

        {/* Sort buttons */}
        <div className="flex gap-1 items-center sm:justify-center">
          <SortWorkoutByTimeButton />
          <SortWorkoutByDateButton />
          <ClearWorkoutsDialog />
        </div>
      </div>

      {/* Search Result */}
      {searchedWorkout && (
        <div>
          <p className="text text-stone-400 italic">
            Resultados para &#34;{searchedWorkout}&#34;
          </p>
        </div>
      )}
    </div>
  );
}
