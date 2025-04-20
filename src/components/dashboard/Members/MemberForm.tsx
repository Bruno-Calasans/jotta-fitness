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
import { useMemberStore } from "@/store/memberStore";
import useCustomToast from "@/hooks/use-custom-toast";
import { Member } from "@/types/Member.type";
import phoneMask from "@/utils/phoneMask";

const memberFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  phone: z.string().min(1, "Celular é obrigatório"),
});

type MemberFormInputs = z.infer<typeof memberFormSchema>;

type MemberFormProps = {
  member?: Member;
  onSubmit: (success: boolean) => void;
};

export default function MemberForm({ member, onSubmit }: MemberFormProps) {
  const { successToast, errorToast } = useCustomToast();
  const memberDb = useMemberStore();

  const form = useForm<MemberFormInputs>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      name: member ? member.name : "",
      phone: member ? phoneMask(member.phone) : "",
    },
  });

  const submitHandler = (input: MemberFormInputs) => {
    // Update member
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

      // Create member
    } else {
      try {
        form.reset();
        // start loading

        // Save to database
        memberDb.add({
          ...input,
          payments: { plans: [], products: [] },
          role: null,
        });

        successToast("Criação de Membro", "Membro criado com sucesso!");
        onSubmit(true);
      } catch (error) {
        errorToast("Criação de Membro", "Erro ao criar Membro!");
        onSubmit(false);
      }
    }
  };

  const phoneInputHandler = () => {
    const phone = form.getValues("phone");
    form.setValue("phone", phoneMask(phone));
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
                <Input placeholder="Seu nome" {...field} />
              </FormControl>
              <FormDescription>Nome para ficar salvo</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Celular</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  maxLength={15}
                  placeholder="(xx) x xxxx-xxxx"
                  onKeyUp={phoneInputHandler}
                  {...field}
                />
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
