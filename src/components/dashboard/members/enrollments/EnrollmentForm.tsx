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
import PlanSelector from "../PlanSelector";
import { useState } from "react";
import EnrollmentPaymentResume from "./EnrollmentPaymentResume";
import { Enrollment } from "@/types/Enrollment.type";
import { useEnrollmentResume } from "@/hooks/use-enrollment-resume";
import CancelButton from "@/components/custom/buttons/CancelButton";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import RequiredFieldTooltip from "@/components/custom/others/RequiredFieldTooltip";
import { useLogStore } from "@/store/logStore";
import { STAFF } from "@/data/MEMBERS_DATA";
import { Checkbox } from "@/components/ui/checkbox";
import ExpireDatePicker from "../../ExpireDatePicker";

const enrollmentFormSchema = z.object({
  plan: z.string().min(1, "Plano é obrigatório"),
  months: z.coerce.number().min(1, "Meses deve ser maior ou igual a 1"),
  expiresIn: z.coerce.date().optional(),
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
  const logDb = useLogStore();
  const { selectedMember, updateEnrollment, addEnrollment } = useMemberStore();
  const { lateFee } = useEnrollmentResume();
  const { successToast, errorToast } = useCustomToast();
  const [selectedPlan, setSelectedPlan] = useState(enrollment?.plan || null);
  const [isManualExpireDate, setIsManualExpireDate] = useState(false);

  const form = useForm<EnrollFormInputs>({
    resolver: zodResolver(enrollmentFormSchema),
    defaultValues: {
      plan: enrollment?.plan.name || "",
      months: enrollment?.months || 1,
    },
  });

  const months = useWatch({ name: "months", control: form.control });
  const expiresIn = useWatch({ name: "expiresIn", control: form.control });

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
            expiresIn,
          }
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
          "Atualização realizada com sucesso"
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
          expiresIn,
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

        {/* Select expire date */}
        <div>
          <label>
            <Checkbox
              checked={isManualExpireDate}
              onCheckedChange={(value) => setIsManualExpireDate(!!value)}
            />{" "}
            Quero selecionar a data da vencimento
          </label>
        </div>

        {isManualExpireDate && (
          <FormField
            control={form.control}
            name="expiresIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <RequiredFieldTooltip>
                    Data de Vencimento
                  </RequiredFieldTooltip>
                </FormLabel>
                <FormControl>
                  <ExpireDatePicker
                    months={months}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Enrollment resume */}
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
