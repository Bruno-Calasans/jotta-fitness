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
import { useToast } from "@/hooks/use-toast";
import { usePlanStore } from "@/store/planStore";
import { Plan } from "@/types/Plan.type";

const planFormSchema = z.object({
  name: z.string().min(1, "Nome do plano é obrigatório"),
  trainTime: z.coerce
    .number()
    .min(1, "Tempo de treino deve ser maior or igual a 1"),
  price: z.coerce.number().min(1, "Preço deve ser maior ou igual a 1"),
});

type PlanFormInputs = z.infer<typeof planFormSchema>;

type PlanFormProps = {
  plan: Plan;
  onSubmit?: (inputs: PlanFormInputs) => void;
};

export default function PlanEditForm({ plan, onSubmit }: PlanFormProps) {
  const { toast } = useToast();
  const planDb = usePlanStore();

  const form = useForm<PlanFormInputs>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      name: plan.name,
      price: plan.price,
      trainTime: plan.trainTime,
    },
  });

  const submitHandler = (inputs: PlanFormInputs) => {
    // start loading
    try {
      form.reset();

      // Save to database
      planDb.update(plan.id, inputs);

      // Result
      toast({
        title: "Atualização de Plano",
        description: "Plano atualizado com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Atualização de Plano",
        description: "Erro ao atualizar plano!",
      });
    }

    // stop loading
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
                <Input placeholder="Plano 1h" {...field} />
              </FormControl>
              <FormDescription>Nome do plano de treino</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* trainTime input */}
        <FormField
          control={form.control}
          name="trainTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tempo de treino (minutos)</FormLabel>
              <FormControl>
                <Input placeholder="60" {...field} type="number" />
              </FormControl>
              <FormDescription>
                Qual a duração do plano (em minutos) por dia
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* price input */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço do plano (R$)</FormLabel>
              <FormControl>
                <Input placeholder="100" {...field} type="number" />
              </FormControl>
              <FormDescription>
                Quanto vai custar seu plano por mês
              </FormDescription>
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
