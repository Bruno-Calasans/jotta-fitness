"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Plus } from "lucide-react";
import WorkoutForm from "./WorkoutForm";
import { useWorkoutStore } from "@/store/workoutStore";

export default function CreateWorkoutDialog() {
  const [open, setOpen] = useState(false);
  const { sortWorkoutsByTime } = useWorkoutStore();

  const submitFormHandler = (success: boolean) => {
    if (success) {
      setOpen(false);
      sortWorkoutsByTime("asc");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600 font-bold">
          <Plus />
          Criar
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle>Novo Treinamento</DialogTitle>
        </DialogHeader>
        <WorkoutForm onSubmit={submitFormHandler} />
      </DialogContent>
    </Dialog>
  );
}
