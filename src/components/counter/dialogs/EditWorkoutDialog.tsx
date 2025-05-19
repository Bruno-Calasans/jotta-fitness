"use client";

import { Eraser, Plus } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChangeEvent, FocusEventHandler, useEffect, useState } from "react";
import { builtInAddTimeData, builtInRemoveTimeData } from "./dialogData";
import { useStore } from "zustand";
import workoutStore from "@/store/workoutStore";

const minTimeValue = 0;

export default function EditWorkoutDialog() {
  const { selectedWorkout, editWorkout, unselectWorkout } =
    useStore(workoutStore);

  const [time, setTime] = useState(selectedWorkout?.time || minTimeValue);
  const [name, setName] = useState(selectedWorkout?.name || "");

  const changeTimeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = target.value.replace(/^0+/, "");
    setTime(Math.max(Number(value), minTimeValue));
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

  const editWorkoutHandler = () => {
    if (!selectedWorkout) return;
    editWorkout(selectedWorkout, {
      name: name,
      initialTime: time,
      time,
    });
  };

  const closeHandler = (open: boolean) => {
    if (!open) {
      clearInputs();
      unselectWorkout();
    }
  };

  const focusHandler: FocusEventHandler<HTMLInputElement> = (e) => {
    if (time == 0) {
      e.target.value = String(selectedWorkout?.time) && "";
    }
  };

  useEffect(() => {
    if (selectedWorkout) {
      setTime(selectedWorkout.time);
      setName(selectedWorkout.name);
    }
  }, [selectedWorkout]);

  return (
    <Dialog onOpenChange={closeHandler} open={!!selectedWorkout}>
      <DialogContent className="w-fit">
        {/* Title */}
        <DialogHeader>
          <DialogTitle className="border-b-2 border-orange-500">
            Editar Treino
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
              placeholder="Digite o nome do aluno"
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
              placeholder="Digite o tempo de treino"
              value={String(time)}
              onChange={changeTimeHandler}
              onFocus={focusHandler}
            />
          </div>
          {/* built-in times */}
          <div className="flex flex-col gap-2">
            <Label className="text-stone-600">Tempos Pré-definidos</Label>
            {/* Add time */}
            <div className="flex gap-1 justify-between">
              {builtInAddTimeData.map((btn) => (
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
              {builtInRemoveTimeData.map((btn) => (
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
                onClick={editWorkoutHandler}
                size="sm"
                title="Adicionar novo contador de treino"
                className="flex items-center p-2 justify-center bg-emerald-500 font-bold hover:bg-emerald-600 w-full gap-1"
              >
                <Plus />
                Salvar
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
