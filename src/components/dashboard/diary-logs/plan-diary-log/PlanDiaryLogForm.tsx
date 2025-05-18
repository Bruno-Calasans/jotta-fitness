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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import useCustomToast from "@/hooks/use-custom-toast";
import { useState } from "react";
import { Plan } from "@/types/Plan.type";
import type { PlanDiaryLog } from "@/types/Log.type";
import MemberSelector from "../MemberSelector";
import { Member } from "@/types/Member.type";
import { useLogStore } from "@/store/logStore";
import { STAFF } from "@/data/MEMBERS_DATA";
import PlanDiaryPaymentResume from "./PlanDiaryPaymentResume";
import { useMemberStore } from "@/store/memberStore";
import RequiredFieldTooltip from "@/components/custom/others/RequiredFieldTooltip";
import PlanDiarySelector from "./PlanDiarySelector";
import createPlanDiary from "@/utils/createPlanDiary";
import updatePlanDiary from "@/utils/updatePlanDiary";

const planDiaryLogFormSchema = z.object({
  member: z.string().optional(),
  plan: z.string().min(1, "Plano é obrigatório"),
  days: z.coerce.number().min(1, "Número de dias deve ser maior que 1"),
});

type PlanDiaryLogFormInputs = z.infer<typeof planDiaryLogFormSchema>;

type PlanDiaryLogFormProps = {
  planDiaryLog?: PlanDiaryLog;
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
      member: planDiaryLog?.member?.name || "",
      days: planDiaryLog?.planDiary.days || 1,
    },
  });

  const days = useWatch({ control: form.control, name: "days" });

  const submitHandler = (input: PlanDiaryLogFormInputs) => {
    if (!selectedPlan) return;

    if (planDiaryLog) {
      try {
        form.reset();

        // Registered Member
        if (selectedMember) {
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

          // Not registered member
        } else {
          logDb.update(planDiaryLog.id, {
            type: "plan-diary",
            planDiary: updatePlanDiary(planDiaryLog.planDiary, {
              days: input.days,
              plan: selectedPlan,
            }),
          });
        }

        successToast(
          "Atualização de Registro de Diária",
          "Registro atualizado com sucesso"
        );
        onSubmit(true);
      } catch (error) {
        errorToast(
          "Atualização de Registro de Diária",
          "Erro ao atualizar registro"
        );
        onSubmit(false);
      }
    } else {
      try {
        form.reset();

        // Registered Member
        if (selectedMember) {
          const planDiary = memberDb.addDiary(selectedMember.id, {
            plan: selectedPlan,
            days,
          });

          if (planDiary)
            logDb.add({
              type: "plan-diary",
              planDiary,
              member: selectedMember,
              createdBy: STAFF,
            });
          //Not registerd Member
        } else {
          logDb.add({
            type: "plan-diary",
            planDiary: createPlanDiary({ days, plan: selectedPlan }),
            createdBy: STAFF,
          });
        }

        successToast("Registro de Diária", "Registro criado com sucesso");
        onSubmit(true);
      } catch (error) {
        errorToast("Registro de Diária", "Erro ao criar registro");
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
                  onValueChange={field.onChange}
                  onItemSelected={setSelectedMember}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Deixe em branco caso não seja um membro registrado.
              </FormDescription>
            </FormItem>
          )}
        />

        {/* Plan input */}
        <FormField
          control={form.control}
          name="plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredFieldTooltip>Diária</RequiredFieldTooltip>
              </FormLabel>
              <FormControl>
                <PlanDiarySelector
                  value={field.value}
                  onValueChange={field.onChange}
                  onItemSelected={setSelectedPlan}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                O valor da diária vai depender do plano selecionado.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="days"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredFieldTooltip>Dias Pagos</RequiredFieldTooltip>
              </FormLabel>
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
            {planDiaryLog ? "Salvar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
