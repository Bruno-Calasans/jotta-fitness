import { Button } from "@/components/ui/button";
import {
  CalendarArrowDown,
  CalendarArrowUp,
  ClockArrowDown,
  ClockArrowUp,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { cn } from "@/lib/utils";
import workoutStore from "@/store/workoutStore";
import { useStore } from "zustand";
import ClearWorkoutsConfirmationDialog from "./dialogs/ClearWorkoutsConfirmationDialog";

type SortType = "asc" | "desc";

export default function WorkoutSearchBar() {
  const {
    searchedWorkout,
    sortWorkoutsByDate,
    sortWorkoutsByTime,
    updateSearchedWorkout,
  } = useStore(workoutStore);

  const [timeSortType, setTimeSortType] = useState<SortType>("desc");
  const [dateSortType, setDateSortType] = useState<SortType>("desc");

  const toggleTimeSortType = () => {
    if (timeSortType === "asc") {
      setTimeSortType("desc");
      sortWorkoutsByTime("desc");
    } else {
      setTimeSortType("asc");
      sortWorkoutsByTime("asc");
    }
  };

  const toggleDateSortTpe = () => {
    if (dateSortType === "asc") {
      setDateSortType("desc");
      sortWorkoutsByDate("desc");
    } else {
      setDateSortType("asc");
      sortWorkoutsByDate("asc");
    }
  };

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateSearchedWorkout(value);
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
        <div className="flex gap-1 items-center sm:justify-center">
          {/* Sort by time */}
          <Button
            onClick={toggleTimeSortType}
            title={
              timeSortType === "asc"
                ? "Ordenar tempo crescente"
                : "Ordenar tempo decrescente"
            }
            size="icon"
            className={cn(
              "bg-orange-500 hover:bg-orange-600",
              timeSortType === "asc" && "bg-emerald-500 hover:bg-emerald-600",
            )}
          >
            {timeSortType === "asc" ? <ClockArrowDown /> : <ClockArrowUp />}
          </Button>

          {/* Sort by date */}
          <Button
            onClick={toggleDateSortTpe}
            title={
              dateSortType === "asc"
                ? "Ordenar data de crescente"
                : "Ordenar data de decrescente"
            }
            size="icon"
            className={cn(
              "bg-orange-500 hover:bg-orange-600",
              dateSortType === "asc" && "bg-emerald-500 hover:bg-emerald-600",
            )}
          >
            {dateSortType === "asc" ? (
              <CalendarArrowDown />
            ) : (
              <CalendarArrowUp />
            )}
          </Button>
          <ClearWorkoutsConfirmationDialog>
            <Button
              title="Limpar treinos"
              size="icon"
              className="bg-red-500 hover:bg-red-600"
            >
              <Trash2 />
            </Button>
          </ClearWorkoutsConfirmationDialog>
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
