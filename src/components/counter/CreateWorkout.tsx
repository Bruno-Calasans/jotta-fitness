"use client";

import { Plus, Eraser } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Workout } from "./WorkoutItem";
import { WorkoutContext } from "./context/WorkoutContext";
import { v4 as uuidv4 } from "uuid";

const addTimeBtn = [
  {
    text: "+1h",
    value: 60,
  },
  {
    text: "+1h30min",
    value: 90,
  },
  {
    text: "+2h",
    value: 120,
  },
  {
    text: "+2h30min",
    value: 180,
  },
];

const removeTimeBtn = [
  {
    text: "-1h",
    value: 60,
  },
  {
    text: "-1h30min",
    value: 90,
  },
  {
    text: "-2h",
    value: 120,
  },
  {
    text: "-2h30min",
    value: 180,
  },
];

const minTimeValue = 0;

type CreateWorkoutProps = {
  onCreate: (workout: Workout) => void;
};

export default function CreateWorkout() {
  const { addWorkout } = useContext(WorkoutContext);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(minTimeValue);
  const [name, setName] = useState("");

  const toggleOpen = () => {
    setOpen((curr) => !curr);
  };

  const changeTimeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTime(Math.max(Number(target.value), minTimeValue));
  };

  const changeNameHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setName(target.value);
  };

  const increaseTime = (value: number) => {
    setTime((curr) => curr + value);
  };

  const decreaseTime = (value: number) => {
    setTime((curr) => Math.max(curr - value, minTimeValue));
  };

  const clearInputs = () => {
    setTime(0);
    setName("");
  };

  const createWorkoutHandler = () => {
    // e.preventDefault();
    addWorkout({
      id: uuidv4(),
      name,
      time,
      finished: false,
    });
    setOpen(false);
  };

  const closeHandler = (open: boolean) => {
    if (!open) {
      clearInputs();
    }
  };

  return (
    <Dialog onOpenChange={closeHandler}>
      <DialogTrigger asChild>
        <Button
          onClick={toggleOpen}
          size="sm"
          title="Adicionar novo contador de treino"
          className="flex items-center p-2 justify-center bg-emerald-500 font-bold hover:bg-emerald-600"
        >
          <Plus />
          Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        {/* Title */}
        <DialogHeader>
          <DialogTitle className="border-b-2 border-orange-500">
            Criar Treino
          </DialogTitle>
        </DialogHeader>

        {/* Content */}
        <div className="flex flex-col gap-4">
          {/* name */}
          <div>
            <Label htmlFor="workout-name">Nome do aluno</Label>
            <Input
              required
              id="workout-name"
              type="text"
              value={name}
              onChange={changeNameHandler}
            />
          </div>
          {/* Time */}
          <div>
            <Label htmlFor="workout-time">Tempo de treino (em minutos)</Label>
            <Input
              required
              id="workout-time"
              type="number"
              placeholder="Nome do aluno"
              value={time}
              onChange={changeTimeHandler}
            />
          </div>
          {/* built-in times */}
          <div className="flex flex-col gap-2">
            <Label className="text-stone-600">Tempos Pré-definidos</Label>
            {/* Add time */}
            <div className="flex gap-1 justify-between">
              {addTimeBtn.map((btn) => (
                <Button
                  key={btn.text}
                  onClick={() => increaseTime(btn.value)}
                  size="sm"
                  className="bg-emerald-500 hover:bg-emerald-600 p-2 items-center justify-center"
                  type="button"
                >
                  {btn.text}
                </Button>
              ))}
            </div>
            <div className="flex gap-1 justify-between">
              {removeTimeBtn.map((btn) => (
                <Button
                  key={btn.text}
                  onClick={() => decreaseTime(btn.value)}
                  size="sm"
                  className="bg-red-500 hover:bg-red-600 p-2 items-center justify-center"
                  type="button"
                >
                  {btn.text}
                </Button>
              ))}
            </div>
          </div>
          <DialogFooter>
            {/* Clear btn */}
            <Button
              onClick={clearInputs}
              size="sm"
              title="Adicionar novo contador de treino"
              className="flex items-center p-2 justify-center bg-indigo-500 font-bold hover:bg-indigo-600 w-full gap-1"
            >
              <Eraser />
              Limpar
            </Button>
            {/* Create btn */}
            <DialogClose asChild>
              <Button
                type="submit"
                onClick={createWorkoutHandler}
                size="sm"
                title="Adicionar novo contador de treino"
                className="flex items-center p-2 justify-center bg-emerald-500 font-bold hover:bg-emerald-600 w-full gap-1"
              >
                <Plus />
                Criar
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
