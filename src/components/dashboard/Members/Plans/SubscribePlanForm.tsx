"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import useCustomToast from "@/hooks/use-custom-toast";
import { useMemberStore } from "@/store/memberStore";
import { PlanSelector } from "../PlanSelector";
import { useState } from "react";
import { Plan } from "@/types/Plan.type";
import PlanPaymentResume from "./PlanPaymentResume";
import { PlanPayment } from "@/types/Payment.type";

const subscribeplanFormSchema = z.object({
  plan: z.string().min(1, "Plano é obrigatório"),
  months: z.coerce.number().min(1, "Meses deve ser maior ou igual a 1"),
});

type SubscribePlanFormInputs = z.infer<typeof subscribeplanFormSchema>;

type SubscribePlanFormProps = {
  planPayment?: PlanPayment;
  onSubmit: (success: boolean) => void;
};

export default function SubscribePlanForm({
  planPayment,
  onSubmit,
}: SubscribePlanFormProps) {
  const { successToast, errorToast } = useCustomToast();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(
    planPayment ? planPayment.plan : null
  );
  const [months, setMonths] = useState(planPayment ? planPayment.months : 1);
  const { selectedMember } = useMemberStore();
  const memberDb = useMemberStore();

  const form = useForm<SubscribePlanFormInputs>({
    resolver: zodResolver(subscribeplanFormSchema),
    defaultValues: {
      plan: planPayment ? planPayment.plan.name : "",
      months: planPayment ? planPayment.months : 1,
    },
  });

  const submitHandler = (input: SubscribePlanFormInputs) => {
    if (!selectedPlan || !selectedMember) return;

    // Update plan payment
    if (planPayment) {
      try {
        form.reset();
        // start loading

        // Save to database
        memberDb.updatePlanPayment(selectedMember.id, planPayment.id, {
          plan: selectedPlan,
          months: input.months,
        });

        successToast(
          "Atualização de Plano",
          "Atualização realizada com sucesso"
        );
        onSubmit(true);
      } catch (error) {
        console.log(error);
        errorToast("Atualização de Plano", "Erro ao realizar atualização!");
        onSubmit(false);
      }
    } else {
      try {
        form.reset();
        // start loading

        // Save to database
        memberDb.subscribe(selectedMember.id, {
          months: input.months,
          plan: selectedPlan,
          createdBy: selectedMember,
        });

        successToast("Inscrição de Plano", "Inscrição realizada com sucesso");
        onSubmit(true);
      } catch (error) {
        errorToast("Inscrição de Plano", "Erro ao realizar inscrição!");
        onSubmit(false);
      }
    }
  };

  if (!selectedMember) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
        {/* Months input */}
        <FormField
          control={form.control}
          name="months"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meses</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Meses"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setMonths(Number(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Plan input */}
        <FormField
          control={form.control}
          name="plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plano</FormLabel>
              <FormControl>
                <PlanSelector
                  value={field.value}
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  onSelected={setSelectedPlan}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Payment resume */}
        {selectedPlan && months > 0 && (
          <PlanPaymentResume plan={selectedPlan} months={months} />
        )}

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
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}
