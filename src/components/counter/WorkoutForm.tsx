"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import RequiredFieldTooltip from "@/components/custom/others/RequiredFieldTooltip";
import CancelButton from "@/components/custom/buttons/CancelButton";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import { useWorkoutStore } from "@/store/workoutStore";
import useCustomToast from "@/hooks/use-custom-toast";
import DefaultWorkoutTimeButtons from "./default-workout-time/DefaultWorkoutTimeButtons";
import clearFieldOnFirstFocus from "@/utils/clearFieldOnFirstFocus";
import ResetButton from "@/components/custom/buttons/ResetButton";

const workoutFormSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  time: z.coerce.number().min(1, "Valor deve ser maior ou igual a 1"),
});

type WorkoutFormInputs = z.infer<typeof workoutFormSchema>;

type WorkoutFormProps = {
  onSubmit: (success: boolean) => void;
};

export default function WorkoutForm({ onSubmit }: WorkoutFormProps) {
  const { selectedWorkout, addWorkout, updateWorkout } = useWorkoutStore();
  const { successToast, errorToast } = useCustomToast();

  const form = useForm<WorkoutFormInputs>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      name: selectedWorkout?.name || "",
      time: selectedWorkout?.time || 0,
    },
  });

  const addTimeHandler = (time: number) => {
    const currentTime = form.getValues("time");
    form.setValue("time", currentTime + time);
  };

  const removeTimeHandler = (time: number) => {
    const currentTime = form.getValues("time");
    form.setValue("time", Math.max(0, currentTime - time));
  };

  const submitHandler = (input: WorkoutFormInputs) => {
    if (selectedWorkout) {
      // Update workout
      try {
        updateWorkout(selectedWorkout.id, { ...selectedWorkout, ...input });
        successToast(
          "Atualização de Treinamento",
          "Treinamento atualizado com sucesso"
        );
        onSubmit(true);
      } catch (error) {
        errorToast(
          "Atualização de Treinamento",
          "Erro ao atualizar treinamento"
        );
        onSubmit(false);
      }
    } else {
      // Create workout
      try {
        addWorkout(input);
        successToast("Criar treinamento", "Treinamento criado com sucesso");
        onSubmit(true);
      } catch (error) {
        errorToast("Criar treinamento", "Erro ao criar treinamento");
        onSubmit(false);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
        {/* Name input */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredFieldTooltip>Nome do Aluno</RequiredFieldTooltip>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Nome do aluno"
                  autoComplete="on"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Time input */}
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredFieldTooltip>Tempo (minutos)</RequiredFieldTooltip>
              </FormLabel>

              <FormControl>
                <Input
                  type="number"
                  onFocus={(e) => clearFieldOnFirstFocus(e, form)}
                  placeholder="Tempo de treinamento"
                  {...field}
                />
              </FormControl>

              {/* Bult-in time */}
              <FormMessage />
              <br />
              <DefaultWorkoutTimeButtons
                onAddTime={addTimeHandler}
                onRemoveTime={removeTimeHandler}
              />
            </FormItem>
          )}
        />

        {/* Form Actions */}
        <div className="flex justify-end gap-5">
          <ResetButton onReset={() => form.reset()} />
          <div className="flex gap-1">
            <CancelButton />
            <ConfirmButton isEditing={!!selectedWorkout} />
          </div>
        </div>
      </form>
    </Form>
  );
}
