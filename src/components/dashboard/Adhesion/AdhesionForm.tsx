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
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { useAdhesionStore } from "@/store/adhesionStore";
import useCustomToast from "@/hooks/use-custom-toast";
import { FocusEventHandler, useEffect } from "react";
import type { toZod } from "tozod";
import type { Adhesion } from "@/types/Adhesion.type";
import type { DB } from "@/types/Db.typ";
import { format, startOfYear, endOfYear } from "date-fns";

type AdhesionFormSchema = toZod<Omit<Adhesion, keyof DB>>;

const adhesionFormSchema: AdhesionFormSchema = z.object({
  year: z.coerce
    .number()
    .min(
      new Date().getFullYear(),
      "Ano da adesão não pode ser inferior ao ano atual"
    ),
  price: z.coerce.number().min(1, "Preço é obrigatório"),
  discountMaxDate: z.coerce
    .date()
    .min(new Date(), "Data deve ser maior ou igual a data de hoje"),
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
      year: adhesion ? adhesion.year : new Date().getFullYear(),
      price: adhesion ? adhesion.price : 1,
      newbieDiscount: adhesion ? adhesion.newbieDiscount : 0,
      veteranDiscount: adhesion ? adhesion.veteranDiscount : 0,
      discountMaxDate: adhesion ? adhesion.discountMaxDate : new Date(),
    },
  });

  const submitHandler = (inputs: AdhesionFormInputs) => {
    // Update adhesion
    if (adhesion) {
      try {
        form.reset();

        // Save to database
        adhesionDb.update(adhesion.id, inputs);

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
        // start loading

        // Save to database
        adhesionDb.add(inputs);

        successToast("Criação de Adesão", "Adesão criado com sucesso!");
        onSubmit(true);
      } catch (error) {
        errorToast("Criação de Adesão", "Erro ao criar Adesão!");
        onSubmit(false);
      }
    }
  };

  // Clear number input value on the first focus
  const focusHandler: FocusEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const isNumberField = e.target.type === "number";

    if (value === "0" && isNumberField) {
      e.target.value = "";
    }
  };

  const calcMinDate = (fromYear: number) => {
    const currentYear = new Date().getFullYear();
    let minDate = new Date();
    minDate.setFullYear(fromYear);

    if (fromYear != currentYear) {
      minDate = startOfYear(minDate);
    }

    return minDate;
  };

  const year = useWatch({ name: "year", control: form.control });
  const minDate = calcMinDate(year);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
        {/* Year input */}
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ano*</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ano da adesão"
                  onFocus={focusHandler}
                  min={new Date().getFullYear()}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price input */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço (R$)*</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Valor da adesão"
                  onFocus={focusHandler}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discountMaxDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desconto válido até*</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={field.value.toString()}
                  min={format(minDate, "yyyy-MM-d")}
                  // max={format(endOfYear(minDate), "yyyy-MM-d")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* newbie offer */}
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
                  onFocus={focusHandler}
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
                  onFocus={focusHandler}
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
            {adhesion ? "Salvar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
