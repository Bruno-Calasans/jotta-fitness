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
import { useProductStore } from "@/store/productStore";
import useCustomToast from "@/hooks/use-custom-toast";
import { Product } from "@/types/Product.type";
import RequiredFieldTooltip from "@/components/custom/RequiredFieldTooltip";
import clearFieldOnFirstFocus from "@/utils/clearFieldOnFirstFocus";
import CancelButton from "@/components/custom/Buttons/CancelButton";
import ConfirmButton from "@/components/custom/Buttons/ConfirmButton";

const productFormSchema = z.object({
  name: z.string().min(1, "Nome do produto é obrigatório"),
  price: z.coerce
    .number()
    .min(1, "Preço do produto deve ser maior or igual a 1"),
  amount: z.coerce
    .number()
    .min(0, "Quantidade do produto deve ser maior ou igual a 0")
    .int("Quantidade do produto tem que ser inteira"),
});

type ProductFormInputs = z.infer<typeof productFormSchema>;

type ProductFormProps = {
  product?: Product;
  onSubmit: (success: boolean) => void;
};

export default function ProductForm({ product, onSubmit }: ProductFormProps) {
  const { successToast, errorToast } = useCustomToast();
  const productDb = useProductStore();

  const form = useForm<ProductFormInputs>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product ? product.name : "",
      price: product ? product.price : 1,
      amount: product ? product.amount : 1,
    },
  });

  const submitHandler = (inputs: ProductFormInputs) => {
    // Update product
    if (product) {
      try {
        form.reset();

        // Save to database
        productDb.update(product.id, inputs);

        // Result
        successToast(
          "Atualização de Produto",
          "Produto atualizado com sucesso!"
        );
        onSubmit(true);
      } catch (error) {
        errorToast("Atualização de Produto", "Erro ao atualizar produto!");
        onSubmit(false);
      }

      // Create product
    } else {
      try {
        form.reset();

        // Save to database
        productDb.add(inputs);

        successToast("Criação de Produto", "Produto criado com sucesso!");
        onSubmit(true);
      } catch (error) {
        errorToast("Criação de Produto", "Erro ao criar Produto!");
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
                <Input
                  placeholder="Luvas"
                  onFocus={(e) => clearFieldOnFirstFocus(e, form)}
                  {...field}
                />
              </FormControl>
              <FormDescription>Nome do produto.</FormDescription>
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
              <FormLabel>
                <RequiredFieldTooltip>Preço (R$)</RequiredFieldTooltip>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="100"
                  onFocus={(e) => clearFieldOnFirstFocus(e, form)}
                  {...field}
                />
              </FormControl>
              <FormDescription>Preço unitário do produto.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Amount input */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredFieldTooltip>Quantidade</RequiredFieldTooltip>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="100"
                  onFocus={(e) => clearFieldOnFirstFocus(e, form)}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Produtos disponíveis no estoque.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Form Actions */}
        <div className="flex justify-end gap-1">
          <CancelButton />
          <ConfirmButton isEditing={!!product} />
        </div>
      </form>
    </Form>
  );
}
