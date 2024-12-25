import { Button } from "@/components/ui/button";
import {
  ClockArrowUp,
  Trash2,
  CalendarArrowDown,
  CalendarArrowUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { WorkoutContext } from "./context/WorkoutContext";
import { cn } from "@/lib/utils";

type SortType = "asc" | "desc";

type WorkoutSearchBarProps = {};

export default function WorkoutSearchBar({}: WorkoutSearchBarProps) {
  const { clearFinishedWorkouts, sortWorkoutsByDate } =
    useContext(WorkoutContext);
  const [sortType, setSortType] = useState<SortType>("asc");

  const toggleSortType = () => {
    if (sortType === "asc") {
      setSortType("desc");
      sortWorkoutsByDate("desc");
    } else {
      setSortType("asc");
      sortWorkoutsByDate("asc");
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        className="bg-white text-orange-600 font-bold"
        type="search"
        placeholder="Pesquise por um nome"
      />
      <Button
        onClick={toggleSortType}
        title={
          sortType === "asc"
            ? "Ordenar data de decrescente"
            : "Ordenar data de crescente"
        }
        size="icon"
        className={cn(
          "bg-orange-500 hover:bg-orange-600",
          sortType === "asc" && "bg-emerald-500 hover:bg-emerald-600"
        )}
      >
        {sortType === "asc" ? <CalendarArrowUp /> : <CalendarArrowDown />}
      </Button>
      <Button
        onClick={clearFinishedWorkouts}
        title="Limpar tempo esgotado"
        size="icon"
        className="bg-orange-500 hover:bg-orange-600"
      >
        <Trash2 />
      </Button>
    </div>
  );
}
