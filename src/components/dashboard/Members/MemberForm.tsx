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
import { useMemberStore } from "@/store/memberStore";
import useCustomToast from "@/hooks/use-custom-toast";
import { Member } from "@/types/Member.type";
import phoneMask from "@/utils/phoneMask";
import RequiredFieldTooltip from "@/components/custom/RequiredFieldTooltip";
import CancelButton from "@/components/custom/Buttons/CancelButton";
import ConfirmButton from "@/components/custom/Buttons/ConfirmButton";

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
      name: member?.name || "",
      phone: phoneMask(member?.phone || ""),
    },
  });

  const submitHandler = (input: MemberFormInputs) => {
    // Update member
    if (member) {
      try {
        form.reset();

        memberDb.update(member.id, input);

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

        memberDb.add(input);

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
              <FormLabel>
                <RequiredFieldTooltip>Nome</RequiredFieldTooltip>
              </FormLabel>
              <FormControl>
                <Input placeholder="Nome do membro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone input */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <FormDescription>
                  <RequiredFieldTooltip>Celular</RequiredFieldTooltip>
                </FormDescription>
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  maxLength={15}
                  placeholder="(xx) x xxxx-xxxx"
                  onKeyUp={phoneInputHandler}
                  {...field}
                />
              </FormControl>
              <FormDescription>Número do celular</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form Actions */}
        <div className="flex justify-end gap-1">
          <CancelButton />
          <ConfirmButton isEditing={!!member} />
        </div>
      </form>
    </Form>
  );
}
