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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCustomToast from "@/hooks/use-custom-toast";
import { Investment } from "@/types/Investment.type";
import { useInvestmentStore } from "@/store/investmentStore";
import RequiredFieldTooltip from "@/components/custom/RequiredFieldTooltip";
import CancelButton from "@/components/custom/Buttons/CancelButton";
import ConfirmButton from "@/components/custom/Buttons/ConfirmButton";

const investmentFormSchema = z.object({
  name: z.string().min(1, "Nome do investimento é obrigatório"),
});

type InvestmentFormInputs = z.infer<typeof investmentFormSchema>;

type InvestmentFormProps = {
  investment?: Investment;
  onSubmit: (success: boolean) => void;
};

export default function InvestmentForm({
  investment,
  onSubmit,
}: InvestmentFormProps) {
  const { successToast, errorToast } = useCustomToast();
  const investmentDb = useInvestmentStore();

  const form = useForm<InvestmentFormInputs>({
    resolver: zodResolver(investmentFormSchema),
    defaultValues: {
      name: investment ? investment.name : "",
    },
  });

  const submitHandler = (input: InvestmentFormInputs) => {
    // Update investment
    if (investment) {
      try {
        form.reset();

        // Save to database
        investmentDb.update(investment.id, input);

        // Result
        successToast(
          "Atualização de Investimento",
          "Investimento atualizado com sucesso!",
        );
        onSubmit(true);
      } catch (error) {
        errorToast(
          "Atualização de Investimento",
          "Erro ao atualizar investimento!",
        );
        onSubmit(false);
      }

      // Create investment
    } else {
      try {
        form.reset();
        // start loading

        // Save to database
        investmentDb.add(input);

        successToast(
          "Criação de Investimento",
          "Investimento criado com sucesso!",
        );
        onSubmit(true);
      } catch (error) {
        errorToast("Criação de Investimento", "Erro ao criar Investimento!");
        onSubmit(false);
      }
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
              <FormLabel>
                <RequiredFieldTooltip>Nome</RequiredFieldTooltip>
              </FormLabel>
              <FormControl>
                <Input placeholder="Nome do investimento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form Actions */}
        <div className="flex justify-end gap-1">
          <CancelButton />
          <ConfirmButton isEditing={!!investment} />
        </div>
      </form>
    </Form>
  );
}
