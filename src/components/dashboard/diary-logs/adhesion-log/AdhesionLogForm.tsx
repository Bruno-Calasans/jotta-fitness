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
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import useCustomToast from "@/hooks/use-custom-toast";
import { useMemberStore } from "@/store/memberStore";
import { useState } from "react";
import type { AdhesionLog } from "@/types/Log.type";
import type { Member } from "@/types/Member.type";
import { useLogStore } from "@/store/logStore";
import { STAFF } from "@/data/MEMBERS_DATA";
import RequiredFieldPopover from "@/components/custom/others/RequiredFieldTooltip";
import { useAdhesionStore } from "@/store/adhesionStore";
import AdhesionMemberSelector from "./AdhesionMemberSelector";
import calcAdhesionPrice from "@/utils/calcAdhesionPrice";
import getCurrentMemberPlan from "@/utils/getCurrentMemberPlan";
import AdhesionPaymentResume from "./AdhesionPaymentResume";

const adhesionLogFormSchema = z.object({
  member: z.string().min(1, "Membro é obrigatório"),
});

type SubscribePlanFormInputs = z.infer<typeof adhesionLogFormSchema>;

type AdhesionLogFormProps = {
  adhesionLog?: AdhesionLog;
  onSubmit: (success: boolean) => void;
};

export default function AdhesionLogForm({
  adhesionLog,
  onSubmit,
}: AdhesionLogFormProps) {
  const logDb = useLogStore();
  const memberDb = useMemberStore();
  const adhesionDb = useAdhesionStore();
  const { successToast, errorToast } = useCustomToast();
  const [selectedMember, setSelectedMember] = useState<Member | null>(
    adhesionLog?.member || null
  );
  const currentAdhesion = adhesionDb.getCurrentYearAdhesion();
  const currentMemberPlan =
    selectedMember && getCurrentMemberPlan(selectedMember);

  const form = useForm<SubscribePlanFormInputs>({
    resolver: zodResolver(adhesionLogFormSchema),
    defaultValues: {
      member: adhesionLog?.member.name || "",
    },
  });

  const submitHandler = (input: SubscribePlanFormInputs) => {
    if (!selectedMember || !currentMemberPlan || !currentAdhesion) return;

    // Update adhesion log
    if (adhesionLog) {
      try {
        form.reset();

        // Remove previous adhesion payment
        if (adhesionLog.member.id !== selectedMember.id) {
          memberDb.removeAdhesionPayment(
            selectedMember.id,
            adhesionLog.adhesion.id
          );
          memberDb.addAdhesionPayment(
            selectedMember.id,
            adhesionLog.adhesion.year
          );
        }

        // Update adhesion log
        logDb.update(adhesionLog.id, {
          type: "adhesion",
          member: selectedMember,
          plan: currentMemberPlan,
          adhesion: currentAdhesion,
          price: calcAdhesionPrice(
            currentAdhesion,
            currentMemberPlan,
            selectedMember
          ),
        });

        // Show success message
        successToast(
          "Atualização de Registro de Adesão",
          "Registro atualizado com sucesso"
        );
        onSubmit(true);
      } catch (error) {
        errorToast(
          "Atualização de Registro de Adesão",
          "Erro ao atualizar registro"
        );
        onSubmit(false);
      }
      // Create new adhesion log
    } else {
      try {
        form.reset();

        // Pay member adhesion
        const adhesionPayment = memberDb.addAdhesionPayment(
          selectedMember.id,
          new Date().getFullYear()
        );

        // create adhesion log
        if (adhesionPayment)
          logDb.add({
            type: "adhesion",
            plan: currentMemberPlan,
            member: selectedMember,
            adhesion: currentAdhesion,
            createdBy: STAFF,
            adhesionPayment,
            price: calcAdhesionPrice(
              currentAdhesion,
              currentMemberPlan,
              selectedMember
            ),
          });

        successToast("Registro de Adesão", "Registro criado com sucesso");
        onSubmit(true);
      } catch (error) {
        errorToast("Registro de Adesão", "Erro ao criar registro");
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
                <AdhesionMemberSelector
                  value={field.value}
                  onValueChange={field.onChange}
                  onItemSelected={setSelectedMember}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Apenas membros que tiverem algum plano e que não pagaram a
                adesão deste ano vão aparecer.
              </FormDescription>
            </FormItem>
          )}
        />

        {/* Adhesion payment resume */}
        {selectedMember && currentAdhesion && currentMemberPlan && (
          <AdhesionPaymentResume
            member={selectedMember}
            adhesion={currentAdhesion}
            plan={currentMemberPlan}
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
            {adhesionLog ? "Salvar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
