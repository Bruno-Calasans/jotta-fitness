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
import useCustomToast from "@/hooks/use-custom-toast";
import { useMemberStore } from "@/store/memberStore";
import { PlanSelector } from "../PlanSelector";
import { useState } from "react";
import { Plan } from "@/types/Plan.type";
import EnrollmentPaymentResume from "./EnrollmentPaymentResume";
import { Enrollment } from "@/types/Enrollment.type";
import { useEnrollmentResume } from "@/hooks/use-enrollment-resume";
import CancelButton from "@/components/custom/Buttons/CancelButton";
import ConfirmButton from "@/components/custom/Buttons/ConfirmButton";
import RequiredFieldTooltip from "@/components/custom/RequiredFieldTooltip";
import { useLogStore } from "@/store/logStore";
import { STAFF } from "@/data/MEMBERS_DATA";

const enrollmentFormSchema = z.object({
  plan: z.string().min(1, "Plano é obrigatório"),
  months: z.coerce.number().min(1, "Meses deve ser maior ou igual a 1"),
});

type EnrollFormInputs = z.infer<typeof enrollmentFormSchema>;

type EnrollmentFormProps = {
  enrollment?: Enrollment;
  onSubmit: (success: boolean) => void;
};

export default function EnrollmentForm({
  enrollment,
  onSubmit,
}: EnrollmentFormProps) {
  const { selectedMember, updateEnrollment, addEnrollment } = useMemberStore();
  const logDb = useLogStore();
  const { lateFee } = useEnrollmentResume();
  const { successToast, errorToast } = useCustomToast();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(
    enrollment?.plan || null,
  );

  const form = useForm<EnrollFormInputs>({
    resolver: zodResolver(enrollmentFormSchema),
    defaultValues: {
      plan: enrollment?.plan.name || "",
      months: enrollment?.months || 1,
    },
  });

  const submitHandler = (input: EnrollFormInputs) => {
    if (!selectedPlan || !selectedMember) return;

    // Update enrollment
    if (enrollment) {
      try {
        form.reset();

        // Update member enrollment
        const updatedEnrollment = updateEnrollment(
          selectedMember.id,
          enrollment.id,
          {
            plan: selectedPlan,
            months: input.months,
          },
        );

        // Update enrollment log
        const enrollmentLog =
          updatedEnrollment && logDb.getByEnrollmentId(updatedEnrollment.id);

        if (enrollmentLog) {
          logDb.update(enrollmentLog.id, {
            type: "enrollment",
            member: selectedMember,
            enrollment,
          });
        }

        successToast(
          "Atualização de Plano",
          "Atualização realizada com sucesso",
        );
        onSubmit(true);
      } catch (error) {
        errorToast("Atualização de Plano", "Erro ao realizar atualização!");
        onSubmit(false);
      }
    } else {
      try {
        form.reset();

        // Add enrollment to member
        const enrollment = addEnrollment(selectedMember.id, {
          months: input.months,
          plan: selectedPlan,
          lateFee,
        });

        // Log enrollment
        if (enrollment)
          logDb.add({
            type: "enrollment",
            enrollment,
            member: selectedMember,
            createdBy: STAFF,
          });

        successToast("Inscrição de Plano", "Inscrição realizada com sucesso");
        onSubmit(true);
      } catch (error) {
        errorToast("Inscrição de Plano", "Erro ao realizar inscrição!");
        onSubmit(false);
      }
    }
  };

  const months = useWatch({ name: "months", control: form.control });

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
              <FormLabel>
                <RequiredFieldTooltip>Meses</RequiredFieldTooltip>
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="Meses" {...field} />
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
              <FormLabel>
                <RequiredFieldTooltip>Plano</RequiredFieldTooltip>
              </FormLabel>
              <FormControl>
                <PlanSelector
                  value={field.value}
                  onValueChange={field.onChange}
                  onItemSelected={setSelectedPlan}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* enrollment resume */}
        {selectedMember && selectedPlan && months > 0 && (
          <EnrollmentPaymentResume
            data={{
              member: selectedMember,
              plan: selectedPlan,
              months,
            }}
          />
        )}

        {/* Form Actions */}
        <div className="flex justify-end gap-1">
          <CancelButton />
          <ConfirmButton isEditing={!!enrollment} />
        </div>
      </form>
    </Form>
  );
}
