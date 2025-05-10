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
import { useMemberStore } from "@/store/memberStore";
import { PlanSelector } from "../../Members/PlanSelector";
import { useState } from "react";
import type { Plan } from "@/types/Plan.type";
import { useEnrollmentResume } from "@/hooks/use-enrollment-resume";
import EnrollmentPaymentResume from "../../Members/Enrollments/EnrollmentPaymentResume";
import type { EnrollmentLog } from "@/types/Log.type";
import MemberSelector from "../MemberSelector";
import type { Member } from "@/types/Member.type";
import { useLogStore } from "@/store/logStore";
import { STAFF } from "@/data/MEMBERS_DATA";
import RequiredFieldPopover from "@/components/custom/RequiredFieldTooltip";

const enrollmentLogFormSchema = z.object({
  member: z.string().min(1, "Membro é obrigatório"),
  plan: z.string().min(1, "Plano é obrigatório"),
  months: z.coerce.number().min(1, "Meses deve ser maior ou igual a 1"),
});

type SubscribePlanFormInputs = z.infer<typeof enrollmentLogFormSchema>;

type EnrollmentLogFormProps = {
  enrollmentLog?: EnrollmentLog;
  onSubmit: (success: boolean) => void;
};

export default function EnrollmentLogForm({
  enrollmentLog,
  onSubmit,
}: EnrollmentLogFormProps) {
  const logDb = useLogStore();
  const memberDb = useMemberStore();
  const { lateFee } = useEnrollmentResume();
  const { successToast, errorToast } = useCustomToast();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(
    enrollmentLog?.enrollment.plan || null
  );
  const [selectedMember, setSelectedMember] = useState<Member | null>(
    enrollmentLog?.member || null
  );

  const form = useForm<SubscribePlanFormInputs>({
    resolver: zodResolver(enrollmentLogFormSchema),
    defaultValues: {
      member: enrollmentLog?.member.name || "",
      plan: enrollmentLog?.enrollment.plan.name || "",
      months: enrollmentLog?.enrollment.months || 1,
    },
  });

  const months = useWatch({ name: "months", control: form.control });

  const submitHandler = (input: SubscribePlanFormInputs) => {
    if (!selectedPlan || !selectedMember) return;

    // Update enrollment log
    if (enrollmentLog) {
      try {
        form.reset();

        // Update
        const enrollment = memberDb.updateEnrollment(
          selectedMember.id,
          enrollmentLog.id,
          {
            plan: selectedPlan,
            months,
          }
        );

        // Update enrollment log
        if (enrollment)
          logDb.update(enrollmentLog.id, {
            type: "enrollment",
            member: selectedMember,
            enrollment,
          });

        // Show success message
        successToast(
          "Atualização de Inscrição",
          "Inscrição atualizada com sucesso"
        );
        onSubmit(true);
      } catch (error) {
        errorToast("Atualização de Inscrição", "Erro ao atualizar inscrição");
        onSubmit(false);
      }
      // Create new enrollment log
    } else {
      try {
        form.reset();

        const enrollment = memberDb.subscribe(selectedMember.id, {
          plan: selectedPlan,
          months,
          lateFee,
          createdBy: STAFF,
        });

        // create enrollment log
        if (enrollment)
          logDb.add({
            type: "enrollment",
            member: selectedMember,
            enrollment,
            createdBy: STAFF,
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
              <FormLabel>
                <RequiredFieldPopover>Membro</RequiredFieldPopover>
              </FormLabel>
              <FormControl>
                <MemberSelector
                  value={field.value}
                  onValueChange={field.onChange}
                  onItemSelected={setSelectedMember}
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
              <FormLabel className="flex items-center">
                <RequiredFieldPopover>Plano</RequiredFieldPopover>
              </FormLabel>
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

        {/* Months input */}
        <FormField
          control={form.control}
          name="months"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredFieldPopover>Mese(s)</RequiredFieldPopover>
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="Meses" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Payment resume */}
        {selectedPlan && months > 0 && (
          <EnrollmentPaymentResume plan={selectedPlan} months={months} />
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
            {enrollmentLog ? "Salvar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
