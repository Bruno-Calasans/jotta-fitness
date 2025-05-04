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
import { Plan } from "@/types/Plan.type";
import { useEnrollmentResume } from "@/hooks/use-enrollment-resume";
import EnrollmentPaymentResume from "../../Members/Enrollments/EnrollmentPaymentResume";
import { EnrollmentLog } from "@/types/Log.type";
import MemberSelector from "../MemberSelector";
import { Member } from "@/types/Member.type";
import { useLogStore } from "@/store/logStore";
import { STAFF } from "@/data/MEMBERS_DATA";

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
  const { successToast, errorToast } = useCustomToast();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(
    enrollmentLog ? enrollmentLog.plan : null
  );
  const [selectedMember, setSelectedMember] = useState<Member | null>(
    enrollmentLog ? enrollmentLog.member : null
  );
  const { lateFee } = useEnrollmentResume();

  const logDb = useLogStore();
  const memberDb = useMemberStore();

  const form = useForm<SubscribePlanFormInputs>({
    resolver: zodResolver(enrollmentLogFormSchema),
    defaultValues: {
      member: enrollmentLog ? enrollmentLog.member.name : "",
      plan: enrollmentLog ? enrollmentLog.plan.name : "",
      months: enrollmentLog ? enrollmentLog.months : 1,
    },
  });

  const months = useWatch({ name: "months", control: form.control });

  const submitHandler = (input: SubscribePlanFormInputs) => {
    if (!selectedPlan || !selectedMember) return;

    // Update plan payment
    if (enrollmentLog) {
      try {
        form.reset();

        // Save enrollment to member
        memberDb.updateEnrollment(selectedMember.id, selectedPlan.id, {
          plan: selectedPlan,
          months: input.months,
        });

        // Update enrollment log
        logDb.update(enrollmentLog.id, {
          type: "enrollment",
          plan: selectedPlan,
          member: selectedMember,
          months,
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
    } else {
      try {
        form.reset();

        // Save to database
        memberDb.subscribe(selectedMember.id, {
          plan: selectedPlan,
          createdBy: STAFF,
          months,
          lateFee,
        });

        // create enrollment log
        logDb.add({
          type: "enrollment",
          plan: selectedPlan,
          member: selectedMember,
          months,
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

        {/* Months input */}
        <FormField
          control={form.control}
          name="months"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meses</FormLabel>
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
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}
