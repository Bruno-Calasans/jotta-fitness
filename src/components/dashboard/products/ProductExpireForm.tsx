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
import { useProductStore } from "@/store/productStore";
import useCustomToast from "@/hooks/use-custom-toast";
import { Product } from "@/types/Product.type";
import clearFieldOnFirstFocus from "@/utils/clearFieldOnFirstFocus";
import CancelButton from "@/components/custom/buttons/CancelButton";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import { Checkbox } from "@/components/ui/checkbox";

const productFormSchema = z.object({
  name: z.string().min(1, "Nome do produto é obrigatório"),
  expiredAmount: z.coerce
    .number()
    .min(0, "Quantidade do produto deve ser maior ou igual a 0")
    .int("Quantidade do produto tem que ser inteira"),
  areAllExpired: z.boolean().optional(),
});

type ProductFormInputs = z.infer<typeof productFormSchema>;

type ProductExpireFormProps = {
  product: Product;
  onSubmit: (success: boolean) => void;
};

export default function ProductExpireForm({
  product,
  onSubmit,
}: ProductExpireFormProps) {
  const { successToast, errorToast } = useCustomToast();
  const productDb = useProductStore();

  const form = useForm<ProductFormInputs>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product.name,
      expiredAmount: product.expiredAmount,
      areAllExpired: false,
    },
  });

  const areAllExpired = useWatch({
    control: form.control,
    name: "areAllExpired",
  });

  const submitHandler = (inputs: ProductFormInputs) => {
    try {
      form.reset();

      // Save to database
      productDb.update(product.id, {
        expiredAmount: inputs.areAllExpired
          ? product.amount
          : inputs.expiredAmount,
      });

      successToast("Atualização de Produto", "Produto atualizado com sucesso!");
      onSubmit(true);
    } catch (error) {
      errorToast("Atualização de Produto", "Erro ao atualizar produto!");
      onSubmit(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
        {/* Name input */}
        <FormField
          disabled
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Produto</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nome do produto"
                  onFocus={(e) => clearFieldOnFirstFocus(e, form)}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Expired Amount input */}
        <FormField
          control={form.control}
          name="areAllExpired"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="ml-1">Marcar todos como expirado</FormLabel>
              <FormDescription>
                Todos os produtos serão marcados como expirados.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Expired Amount input */}
        {!areAllExpired && (
          <FormField
            control={form.control}
            name="expiredAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade de Expirados</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="100"
                    onFocus={(e) => clearFieldOnFirstFocus(e, form)}
                    min={0}
                    max={product.amount}
                    {...field}
                    onChange={(e) => {
                      if (e.target.value) {
                        const value = Number(e.target.value);
                        field.onChange(Math.min(product.amount, value));
                      } else {
                        field.onChange(e.target.value);
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Escolha a quantidade de produtos expirados.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Form Actions */}
        <div className="flex justify-end gap-1">
          <CancelButton />
          <ConfirmButton isEditing={!!product} />
        </div>
      </form>
    </Form>
  );
}
