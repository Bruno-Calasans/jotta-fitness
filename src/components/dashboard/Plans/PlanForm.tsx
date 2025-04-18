"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { usePlanStore } from "@/store/planStore";
import useCustomToast from "@/hooks/use-custom-toast";
import { Plan } from "@/types/Plan.type";
import { FocusEventHandler } from "react";

const planFormSchema = z.object({
  name: z.string().min(1, "Nome do plano é obrigatório"),
  trainTime: z.coerce
    .number()
    .min(1, "Tempo de treino deve ser maior or igual a 1"),
  price: z.coerce.number().min(1, "Preço deve ser maior ou igual a 1"),
});

type PlanFormInputs = z.infer<typeof planFormSchema>;

type PlanFormProps = {
  plan?: Plan;
  onSubmit: (success: boolean) => void;
};

export default function PlanForm({ plan, onSubmit }: PlanFormProps) {
  const { successToast, errorToast } = useCustomToast();
  const planDb = usePlanStore();

  const form = useForm<PlanFormInputs>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      name: plan ? plan.name : "",
      price: plan ? plan.price : 0,
      trainTime: plan ? plan.trainTime : 0,
    },
  });

  const submitHandler = (inputs: PlanFormInputs) => {
    // Update plan
    if (plan) {
      try {
        form.reset();

        // Save to database
        planDb.update(plan.id, inputs);

        // Result
        successToast("Atualização de Plano", "Plano atualizado com sucesso!");
        onSubmit(true);
      } catch (error) {
        errorToast("Atualização de Plano", "Erro ao atualizar plano!");
        onSubmit(false);
      }

      // Create plan
    } else {
      try {
        form.reset();
        // start loading

        // Save to database
        planDb.add(inputs);

        successToast("Criação de Plano", "Plano criado com sucesso!");
        onSubmit(true);
      } catch (error) {
        errorToast("Criação de Plano", "Erro ao criar Plano!");
        onSubmit(false);
      }
    }
  };

  // Clear number input value on the first focus
  const focusHandler: FocusEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const isNumberField = e.target.type === "number";

    if (value === "0" && isNumberField) {
      e.target.value = "";
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
        {/* name input */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Plano 1h" {...field} />
              </FormControl>
              <FormDescription>Nome do plano de treino</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* trainTime input */}
        <FormField
          control={form.control}
          name="trainTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tempo de treino (minutos)</FormLabel>
              <FormControl>
                <Input
                  onFocus={focusHandler}
                  placeholder="60"
                  {...field}
                  type="number"
                />
              </FormControl>
              <FormDescription>
                Qual a duração do plano (em minutos) por dia
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* price input */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço do plano (R$)</FormLabel>
              <FormControl>
                <Input
                  onFocus={focusHandler}
                  placeholder="100"
                  {...field}
                  type="number"
                />
              </FormControl>
              <FormDescription>
                Quanto vai custar seu plano por mês
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Form Actions */}
        <div className="flex justify-end gap-1">
          <DialogClose asChild>
            <Button
              className="bg-red-500 hover:bg-red-600 transition-all"
              type="button"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            className="bg-indigo-500 hover:bg-indigo-600 transition-all"
            type="submit"
          >
            {plan ? "Salvar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
