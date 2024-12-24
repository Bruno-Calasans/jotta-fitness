import { Button } from "@/components/ui/button";
import { ClockArrowUp, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { WorkoutContext } from "./context/WorkoutContext";

type WorkoutSearchBarProps = {};

export default function WorkoutSearchBar({}: WorkoutSearchBarProps) {
  const { clearFinishedWorkouts } = useContext(WorkoutContext);
  return (
    <div className="flex gap-2">
      <Input
        className="bg-white text-orange-600 font-bold"
        type="search"
        placeholder="Pesquise por um nome"
      />
      <Button
        title="Ordenar por tempo"
        size="icon"
        className="bg-orange-500 hover:bg-orange-600"
      >
        <ClockArrowUp />
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
