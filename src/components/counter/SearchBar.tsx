import { Button } from "@/components/ui/button";
import { ClockArrowUp, ClockArrowDown, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

type WorkoutSearchBarProps = {};

export default function WorkoutSearchBar({}: WorkoutSearchBarProps) {
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
        title="Limpar tempo esgotado"
        size="icon"
        className="bg-orange-500 hover:bg-orange-600"
      >
        <Trash2 />
      </Button>
    </div>
  );
}
