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
import { useState } from "react";
import type { Log } from "@/types/Log.type";
import { useLogStore } from "@/store/logStore";
import { STAFF } from "@/data/MEMBERS_DATA";
import { Expense } from "@/types/Expense.type";
import { Investment } from "@/types/Investment.type";
import LossTypeSelector from "./LossTypeSelector";
import InvestmentSelector from "./InvestmentSelector";
import ExpenseSelector from "./ExpenseSelector";

const lossLogFormSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  type: z.enum(["expense", "investment"]),
  value: z.coerce.number().min(1, "Valor deve ser maior ou igual a 1"),
});

type LossLogFormInputs = z.infer<typeof lossLogFormSchema>;

type LossLogFormProps = {
  lossLog?: Log & { type: "investment" | "expense" };
  onSubmit: (success: boolean) => void;
};

export default function LossLogForm({ lossLog, onSubmit }: LossLogFormProps) {
  const logDb = useLogStore();
  const { successToast, errorToast } = useCustomToast();
  const [selectedLoss, setSelectedLoss] = useState<Expense | Investment | null>(
    lossLog?.item || null
  );

  const form = useForm<LossLogFormInputs>({
    resolver: zodResolver(lossLogFormSchema),
    defaultValues: {
      name: lossLog?.item.name || "",
      type: lossLog?.type || "expense",
      value: lossLog?.value || 0,
    },
  });

  const submitHandler = (input: LossLogFormInputs) => {
    if (!selectedLoss) return;

    // Update loss register
    if (lossLog) {
      try {
        form.reset();
        // Update loss log
        logDb.update(lossLog.id, {
          type: input.type,
          item: selectedLoss,
          value: input.value,
        });

        // Show success message
        successToast(
          "Atualização de Registro de Perda",
          "Registro de perda atualizado com sucecsso"
        );
        onSubmit(true);
      } catch (error) {
        errorToast(
          "Atualização de Registro de Perda",
          "Erro ao atualizar registro de perda"
        );
        onSubmit(false);
      }
    } else {
      try {
        form.reset();
        logDb.add({
          type: input.type,
          item: selectedLoss,
          value: input.value,
        });

        successToast(
          "Criação de Registro de Perda",
          "Registro criado com sucesso"
        );
        onSubmit(true);
      } catch (error) {
        errorToast("Criação de Registro de Perda", "Erro ao registrar perda");
        onSubmit(false);
      }
    }
  };

  const type = useWatch({ control: form.control, name: "type" });
  console.log(selectedLoss);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
        {/* Plan input */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Perda</FormLabel>
              <FormControl>
                <LossTypeSelector
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {type === "investment" && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Investimento</FormLabel>
                <FormControl>
                  <InvestmentSelector
                    value={field.value}
                    onValueChange={field.onChange}
                    onItemSelected={setSelectedLoss}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {type === "expense" && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Despesa</FormLabel>
                <FormControl>
                  <ExpenseSelector
                    value={field.value}
                    onValueChange={field.onChange}
                    onItemSelected={setSelectedLoss}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Months input */}
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor (R$)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Valor" {...field} />
              </FormControl>
              <FormMessage />
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
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}
