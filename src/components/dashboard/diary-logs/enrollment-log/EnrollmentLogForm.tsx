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
import PlanSelector from "@/components/dashboard/members/PlanSelector";
import { useState } from "react";
import { useEnrollmentResume } from "@/hooks/use-enrollment-resume";
import EnrollmentPaymentResume from "@/components/dashboard/members/enrollments/EnrollmentPaymentResume";
import type { EnrollmentLog } from "@/types/Log.type";
import MemberSelector from "../MemberSelector";
import { useLogStore } from "@/store/logStore";
import { STAFF } from "@/data/MEMBERS_DATA";
import RequiredFieldPopover from "@/components/custom/others/RequiredFieldTooltip";
import { Checkbox } from "@/components/ui/checkbox";
import RequiredFieldTooltip from "@/components/custom/others/RequiredFieldTooltip";
import ExpireDatePicker from "../../ExpireDatePicker";

const enrollmentLogFormSchema = z.object({
  member: z.string().min(1, "Membro é obrigatório"),
  plan: z.string().min(1, "Plano é obrigatório"),
  months: z.coerce.number().min(1, "Meses deve ser maior ou igual a 1"),
  expiresIn: z.coerce.date().optional(),
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
  const [selectedPlan, setSelectedPlan] = useState(
    enrollmentLog?.enrollment.plan || null
  );
  const [selectedMember, setSelectedMember] = useState(
    enrollmentLog?.member || null
  );
  const [isManualExpireDate, setIsManualExpireDate] = useState(false);

  const form = useForm<SubscribePlanFormInputs>({
    resolver: zodResolver(enrollmentLogFormSchema),
    defaultValues: {
      member: enrollmentLog?.member.name || "",
      plan: enrollmentLog?.enrollment.plan.name || "",
      months: enrollmentLog?.enrollment.months || 1,
      expiresIn: enrollmentLog?.enrollment.expiresIn,
    },
  });

  const months = useWatch({ name: "months", control: form.control });
  const expiresIn = useWatch({ name: "expiresIn", control: form.control });

  const submitHandler = (input: SubscribePlanFormInputs) => {
    if (!selectedPlan || !selectedMember) return;

    // Update enrollment log
    if (enrollmentLog) {
      try {
        form.reset();

        // Update
        const enrollment = memberDb.updateEnrollment(
          selectedMember.id,
          enrollmentLog.enrollment.id,
          {
            plan: selectedPlan,
            months,
            expiresIn,
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

        const enrollment = memberDb.addEnrollment(selectedMember.id, {
          plan: selectedPlan,
          months,
          lateFee,
          expiresIn,
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
                  onValueChange={field.onChange}
                  onItemSelected={setSelectedPlan}
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

        {/* Payment resume */}
        {selectedPlan && months > 0 && selectedMember && (
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
