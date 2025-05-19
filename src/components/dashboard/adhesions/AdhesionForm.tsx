"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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
import { useAdhesionStore } from "@/store/adhesionStore";
import useCustomToast from "@/hooks/use-custom-toast";
import type { Adhesion } from "@/types/Adhesion.type";
import clearFieldOnFirstFocus from "@/utils/clearFieldOnFirstFocus";
import CancelButton from "@/components/custom/buttons/CancelButton";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import RequiredFieldTooltip from "@/components/custom/others/RequiredFieldTooltip";
import dateToInputFormat from "@/utils/dateToInputFormat";
import inputFormatToDate from "@/utils/inputFormatToDate";
import calcMinDateFromYear from "@/utils/calcMinDateFromYear";

const adhesionFormSchema = z.object({
  year: z.coerce
    .number()
    .min(
      new Date().getFullYear(),
      "Ano da adesão não pode ser inferior ao ano atual",
    ),
  discountMaxDate: z.string(),
  newbieDiscount: z.coerce.number().min(0, "Disconto não pode ser negativo"),
  veteranDiscount: z.coerce.number().min(0, "Disconto não pode ser negativo"),
});

type AdhesionFormInputs = z.infer<typeof adhesionFormSchema>;

type AdhesionFormProps = {
  adhesion?: Adhesion;
  onSubmit: (success: boolean) => void;
};

export default function AdhesionForm({
  adhesion,
  onSubmit,
}: AdhesionFormProps) {
  const { successToast, errorToast } = useCustomToast();
  const adhesionDb = useAdhesionStore();

  const form = useForm<AdhesionFormInputs>({
    resolver: zodResolver(adhesionFormSchema),
    defaultValues: {
      year: adhesion?.year || new Date().getFullYear(),
      newbieDiscount: adhesion?.newbieDiscount || 0,
      veteranDiscount: adhesion?.veteranDiscount || 0,
      // discountMaxDate: adhesion?.discountMaxDate || new Date(),
      discountMaxDate: dateToInputFormat(
        adhesion?.discountMaxDate || new Date(),
      ),
    },
  });

  const submitHandler = (input: AdhesionFormInputs) => {
    const discountMaxDate = inputFormatToDate(input.discountMaxDate);

    // Update adhesion
    if (adhesion) {
      try {
        form.reset();

        // Save to database
        adhesionDb.update(adhesion.id, {
          ...input,
          discountMaxDate,
        });

        // Result
        successToast("Atualização de Adesão", "Adesão atualizada com sucesso!");
        onSubmit(true);
      } catch (error) {
        errorToast("Atualização de Adesão", "Erro ao atualizar adesão!");
        onSubmit(false);
      }

      // Create adhesion
    } else {
      try {
        form.reset();

        adhesionDb.add({
          ...input,
          discountMaxDate,
        });

        successToast("Criação de Adesão", "Adesão criado com sucesso!");
        onSubmit(true);
      } catch (error) {
        errorToast("Criação de Adesão", "Erro ao criar Adesão!");
        onSubmit(false);
      }
    }
  };

  const year = useWatch({ name: "year", control: form.control });
  const minYear = new Date().getFullYear();
  const minDate = dateToInputFormat(calcMinDateFromYear(year));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
        {/* Year input */}
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredFieldTooltip>Ano</RequiredFieldTooltip>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ano da adesão"
                  min={minYear}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Max date for discount input */}
        <FormField
          control={form.control}
          name="discountMaxDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desconto válido até</FormLabel>
              <FormControl>
                <Input type="date" min={minDate} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* newbie discount input */}
        <FormField
          control={form.control}
          name="newbieDiscount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desconto para novatos (em %)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="100%"
                  onFocus={(e) => clearFieldOnFirstFocus(e, form)}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Membros novatos são aqueles com menos que 40 dias.
              </FormDescription>
            </FormItem>
          )}
        />

        {/* veteran offer */}
        <FormField
          control={form.control}
          name="veteranDiscount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desconto para Veteranos (em %)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="100%"
                  onFocus={(e) => clearFieldOnFirstFocus(e, form)}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Membros veteranos são aqueles com mais que 40 dias.
              </FormDescription>
            </FormItem>
          )}
        />

        {/* Form Actions */}
        <div className="flex justify-end gap-1">
          <CancelButton />
          <ConfirmButton isEditing={!!adhesion} />
        </div>
      </form>
    </Form>
  );
}
