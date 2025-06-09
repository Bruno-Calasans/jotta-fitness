import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWorkoutStore } from "@/store/workoutStore";
import { useState } from "react";
import { CalendarArrowDown, CalendarArrowUp } from "lucide-react";

type SortType = "asc" | "desc";

export default function SortWorkoutByDateButton() {
  const { sortWorkoutsByDate } = useWorkoutStore();
  const [dateSortType, setDateSortType] = useState<SortType>("desc");

  const toggleDateSortTpe = () => {
    if (dateSortType === "asc") {
      setDateSortType("desc");
      sortWorkoutsByDate("desc");
    } else {
      setDateSortType("asc");
      sortWorkoutsByDate("asc");
    }
  };

  return (
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
      {dateSortType === "asc" ? <CalendarArrowDown /> : <CalendarArrowUp />}
    </Button>
  );
}
