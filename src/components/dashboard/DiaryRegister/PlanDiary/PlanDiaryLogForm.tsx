"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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
import { PlanSelector } from "../../Members/PlanSelector";
import { useState } from "react";
import { Plan } from "@/types/Plan.type";
import type { Log } from "@/types/Log.type";
import MemberSelector from "../MemberSelector";
import { Member } from "@/types/Member.type";
import { useLogStore } from "@/store/logStore";
import { STAFF } from "@/data/MEMBERS_DATA";
import PlanDiaryPaymentResume from "./PlanDiaryPaymentResume";
import { useMemberStore } from "@/store/memberStore";

const planDiaryLogFormSchema = z.object({
  member: z.string().min(1, "Membro é obrigatório"),
  plan: z.string().min(1, "Plano é obrigatório"),
  days: z.coerce.number().min(1, "Número de dias deve ser maior que 1"),
  // isNotMember: z.boolean().default(false).optional(),
});

type PlanDiaryLogFormInputs = z.infer<typeof planDiaryLogFormSchema>;

type PlanDiaryLogFormProps = {
  planDiaryLog?: Log & { type: "plan-diary" };
  onSubmit: (success: boolean) => void;
};

export default function PlanDiaryLogForm({
  planDiaryLog,
  onSubmit,
}: PlanDiaryLogFormProps) {
  const logDb = useLogStore();
  const memberDb = useMemberStore();
  const { successToast, errorToast } = useCustomToast();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(
    planDiaryLog?.planDiary.plan || null
  );
  const [selectedMember, setSelectedMember] = useState<Member | null>(
    planDiaryLog?.member || null
  );

  const form = useForm<PlanDiaryLogFormInputs>({
    resolver: zodResolver(planDiaryLogFormSchema),
    defaultValues: {
      plan: planDiaryLog?.planDiary.plan.name || "",
      member: planDiaryLog?.member.name || "",
      days: planDiaryLog?.planDiary.days || 1,
      // isNotMember: false,
    },
  });

  const days = useWatch({ control: form.control, name: "days" });

  const submitHandler = (input: PlanDiaryLogFormInputs) => {
    if (!selectedPlan || !selectedMember) return;

    if (planDiaryLog) {
      try {
        form.reset();

        const updatedPlanDiary = memberDb.updateDiary(
          selectedMember.id,
          planDiaryLog.planDiary.id,
          {
            plan: selectedPlan,
            days,
          }
        );

        if (updatedPlanDiary)
          logDb.update(planDiaryLog.id, {
            type: "plan-diary",
            member: selectedMember,
            planDiary: updatedPlanDiary,
          });

        successToast(
          "Atualização de Inscrição",
          "Inscrição atualizada com sucesso"
        );
        onSubmit(true);
      } catch (error) {
        errorToast("Atualização de Inscrição", "Erro ao atualizar inscrição");
        onSubmit(false);
      }
    } else {
      try {
        form.reset();

        const planDiary = memberDb.addDiary(selectedMember.id, {
          plan: selectedPlan,
          days,
        });

        if (planDiary)
          logDb.add({
            type: "plan-diary",
            member: selectedMember,
            planDiary,
          });

        successToast("Registro de Inscrição", "Registro criado com sucesso");
        onSubmit(true);
      } catch (error) {
        errorToast("Registro de Inscrição", "Erro ao registrar inscrição");
        onSubmit(false);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
        {/* Plan input */}
        <FormField
          control={form.control}
          name="member"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Membro</FormLabel>
              <FormControl>
                <MemberSelector
                  value={field.value}
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  onSelected={setSelectedMember}
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

        <FormField
          control={form.control}
          name="days"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dias Pagos</FormLabel>
              <FormControl>
                <Input type="number" {...field} min={1} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Payment resume */}
        {selectedPlan && days > 0 && (
          <PlanDiaryPaymentResume plan={selectedPlan} days={days} />
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
