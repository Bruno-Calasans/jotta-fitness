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
import { useExpenseStore } from "@/store/expenseStore";
import useCustomToast from "@/hooks/use-custom-toast";
import { Expense } from "@/types/Expense.type";
import { FocusEventHandler } from "react";

const expenseFormSchema = z.object({
  name: z.string().min(1, "Nome da despesa é obrigatório"),
});

type ExpenseFormInputs = z.infer<typeof expenseFormSchema>;

type ExpenseFormProps = {
  expense?: Expense;
  onSubmit: (success: boolean) => void;
};

export default function ExpenseForm({ expense, onSubmit }: ExpenseFormProps) {
  const { successToast, errorToast } = useCustomToast();
  const expenseDb = useExpenseStore();

  const form = useForm<ExpenseFormInputs>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      name: expense ? expense.name : "",
    },
  });

  const submitHandler = (inputs: ExpenseFormInputs) => {
    // Update expense
    if (expense) {
      try {
        form.reset();

        // Save to database
        expenseDb.update(expense.id, inputs);

        // Result
        successToast(
          "Atualização de Despesa",
          "Despesa atualizado com sucesso!"
        );
        onSubmit(true);
      } catch (error) {
        errorToast("Atualização de Despesa", "Erro ao atualizar despesa!");
        onSubmit(false);
      }

      // Create expense
    } else {
      try {
        form.reset();
        // start loading

        // Save to database
        expenseDb.add(inputs);

        successToast("Criação de Despesa", "Despesa criado com sucesso!");
        onSubmit(true);
      } catch (error) {
        errorToast("Criação de Despesa", "Erro ao criar Despesa!");
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
                <Input placeholder="Nome da despesa" {...field} />
              </FormControl>
              <FormDescription>Qual o nome do despesa.</FormDescription>
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
            {expense ? "Salvar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
