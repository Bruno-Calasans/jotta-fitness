"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import useCustomToast from "@/hooks/use-custom-toast";
import { Investment } from "@/types/Investment.type";
import { FocusEventHandler } from "react";
import { useInvestmentStore } from "@/store/investmentStore";

const investmentFormSchema = z.object({
  name: z.string().min(1, "Nome do investimento é obrigatório"),
});

type InvestmentFormInputs = z.infer<typeof investmentFormSchema>;

type InvestmentFormProps = {
  investment?: Investment;
  onSubmit: (success: boolean) => void;
};

export default function InvestmentForm({ investment, onSubmit }: InvestmentFormProps) {
  const { successToast, errorToast } = useCustomToast();
  const investmentDb = useInvestmentStore();

  const form = useForm<InvestmentFormInputs>({
    resolver: zodResolver(investmentFormSchema),
    defaultValues: {
      name: investment ? investment.name : "",
    },
  });

  const submitHandler = (inputs: InvestmentFormInputs) => {
    // Update investment
    if (investment) {
      try {
        form.reset();

        // Save to database
        investmentDb.update(investment.id, inputs);

        // Result
        successToast(
          "Atualização de Investimento",
          "Investimento atualizado com sucesso!"
        );
        onSubmit(true);
      } catch (error) {
        errorToast("Atualização de Investimento", "Erro ao atualizar investimento!");
        onSubmit(false);
      }

      // Create investment
    } else {
      try {
        form.reset();
        // start loading

        // Save to database
        investmentDb.add(inputs);

        successToast("Criação de Investimento", "Investimento criado com sucesso!");
        onSubmit(true);
      } catch (error) {
        errorToast("Criação de Investimento", "Erro ao criar Investimento!");
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
        {/* name input */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome do investimento" {...field} />
              </FormControl>
              <FormDescription>Qual o nome do investimento.</FormDescription>
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
            {investment ? "Salvar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
