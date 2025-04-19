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
import { Member } from "@/types/Member.type";
import { useMemberStore } from "@/store/memberStore";

const subscribeplanFormSchema = z.object({
  plan: z.string().min(1, "Plano é obrigatório"),
  amount: z.coerce.number().min(1, "Meses é obrigatório"),
});

type SubscribePlanFormInputs = z.infer<typeof subscribeplanFormSchema>;

type SubscribePlanFormProps = {
  member?: Member;
  onSubmit: (success: boolean) => void;
};

export default function SubscribePlanForm({
  member,
  onSubmit,
}: SubscribePlanFormProps) {
  const { successToast, errorToast } = useCustomToast();
  const memberDb = useMemberStore();

  const form = useForm<SubscribePlanFormInputs>({
    resolver: zodResolver(subscribeplanFormSchema),
    defaultValues: {
      plan:
        member && member.payments
          ? member.payments.plans[member.payments.plans.length - 1].plan.name
          : "",
      amount:
        member && member.payments
          ? member.payments.plans[member.payments.plans.length - 1].amount
          : 1,
    },
  });

  const submitHandler = (input: SubscribePlanFormInputs) => {
    // Update subscribeplan
    if (member) {
      try {
        form.reset();

        // Save to database
        memberDb.update(member.id, { ...input });

        // Result
        successToast("Atualização de Membro", "Membro atualizado com sucesso!");
        onSubmit(true);
      } catch (error) {
        errorToast("Atualização de Membro", "Erro ao atualizar membro!");
        onSubmit(false);
      }

      // Create subscribeplan
    } else {
      try {
        form.reset();
        // start loading

        // Save to database
        memberDb.add({
          ...input,
          payments: null,
          role: null,
          plan: null,
        });

        successToast("Criação de Membro", "Membro criado com sucesso!");
        onSubmit(true);
      } catch (error) {
        errorToast("Criação de Membro", "Erro ao criar Membro!");
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
          name="plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome" {...field} />
              </FormControl>
              <FormDescription>Nome para ficar salvo</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade (meses)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>Seu número de celular</FormDescription>
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
            {member ? "Salvar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
