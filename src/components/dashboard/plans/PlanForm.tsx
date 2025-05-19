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
import { usePlanStore } from "@/store/planStore";
import useCustomToast from "@/hooks/use-custom-toast";
import { Plan } from "@/types/Plan.type";
import clearFieldOnFirstFocus from "@/utils/clearFieldOnFirstFocus";
import CancelButton from "@/components/custom/buttons/CancelButton";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import RequiredFieldTooltip from "@/components/custom/others/RequiredFieldTooltip";

const planFormSchema = z.object({
  name: z.string().min(1, "Nome do plano é obrigatório"),
  trainTime: z.coerce
    .number()
    .min(1, "Tempo de treino deve ser maior or igual a 1"),
  price: z.coerce.number().min(1, "Preço deve ser maior ou igual a 1"),
  diary: z.coerce
    .number()
    .min(1, "Preço da diária deve ser maior ou igual a 1"),
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
      diary: plan ? plan.diary : 0,
    },
  });

  const submitHandler = (inputs: PlanFormInputs) => {
    // Update plan
    if (plan) {
      try {
        form.reset();

        planDb.update(plan.id, inputs);

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
        {/* name input */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredFieldTooltip>Nome</RequiredFieldTooltip>
              </FormLabel>
              <FormControl>
                <Input
                  id="plan-name-input"
                  placeholder="Plano 1h"
                  onFocus={(e) => clearFieldOnFirstFocus(e, form)}
                  {...field}
                />
              </FormControl>
              <FormDescription>Nome do plano</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* train time input */}
        <FormField
          control={form.control}
          name="trainTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredFieldTooltip>
                  Tempo de treino (minutos)
                </RequiredFieldTooltip>
              </FormLabel>
              <FormControl>
                <Input
                  id="plan-train-time-input"
                  type="number"
                  placeholder="60"
                  onFocus={(e) => clearFieldOnFirstFocus(e, form)}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Duração do plano (em minutos) por dia.
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
              <FormLabel>
                <RequiredFieldTooltip>Preço (R$)</RequiredFieldTooltip>
              </FormLabel>
              <FormControl>
                <Input
                  id="plan-price-input"
                  type="number"
                  placeholder="100"
                  onFocus={(e) => clearFieldOnFirstFocus(e, form)}
                  {...field}
                />
              </FormControl>
              <FormDescription>Custo do plano por mês.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* price input */}
        <FormField
          control={form.control}
          name="diary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredFieldTooltip>Diária (R$)</RequiredFieldTooltip>
              </FormLabel>
              <FormControl>
                <Input
                  id="plan-diary-input"
                  type="number"
                  placeholder="100"
                  onFocus={(e) => clearFieldOnFirstFocus(e, form)}
                  {...field}
                />
              </FormControl>
              <FormDescription>Custo da diária.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Form Actions */}
        <div className="flex justify-end gap-1">
          <CancelButton />
          <ConfirmButton isEditing={!!plan} />
        </div>
      </form>
    </Form>
  );
}
