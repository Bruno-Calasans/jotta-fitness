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
import { useMemberStore } from "@/store/memberStore";
import { useEffect, useState } from "react";
import { Purchase } from "@/types/Purchase.type";
import { Product } from "@/types/Product.type";
import { ProductSelector } from "./ProductSelector";
import PurchasePaymentResume from "./PurchasePaymentResume";
import { STAFF } from "@/data/MEMBERS_DATA";
import { useProductStore } from "@/store/productStore";

const subscriptionFormSchema = z.object({
  product: z.string().min(1, "Produto é obrigatório"),
  amount: z.coerce.number().min(1, "Quantidade deve ser maior ou igual a 1"),
});

type SubscribePlanFormInputs = z.infer<typeof subscriptionFormSchema>;

type SubscriptionFormProps = {
  purchase?: Purchase;
  onSubmit: (success: boolean) => void;
};

export default function SubscriptionForm({
  purchase,
  onSubmit,
}: SubscriptionFormProps) {
  const memberDb = useMemberStore();
  const productDb = useProductStore();
  const { selectedMember } = useMemberStore();
  const { successToast, errorToast } = useCustomToast();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    purchase ? purchase.product : null
  );

  const form = useForm<SubscribePlanFormInputs>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      product: purchase ? purchase.product.name : "",
      amount: purchase ? purchase.amount : 1,
    },
  });

  const amount = useWatch({ name: "amount", control: form.control });

  useEffect(() => {
    if (selectedProduct && amount > selectedProduct.amount) {
      form.setValue("amount", selectedProduct.amount);
    }
  }, [amount, selectedProduct]);

  const submitHandler = (input: SubscribePlanFormInputs) => {
    if (!selectedProduct || !selectedMember) return;

    // Update plan payment
    if (purchase) {
      try {
        form.reset();
        // start loading

        // Save to database
        memberDb.updatePurchase(selectedMember.id, purchase.id, {
          product: selectedProduct,
          amount,
        });

        // Update amount
        const amountDiff = amount - purchase.amount;

        if (amountDiff > 0) {
          productDb.decreaseAmount(selectedProduct.id, amountDiff);
        }

        if (amountDiff < 0) {
          productDb.increaseAmount(selectedProduct.id, amountDiff);
        }

        successToast(
          "Atualização de Compra",
          "Atualização realizada com sucesso"
        );
        onSubmit(true);
      } catch (error) {
        errorToast("Atualização de Compra", "Atualização falhou");
        onSubmit(false);
      }
    } else {
      try {
        form.reset();
        // start loading

        // Save to database
        memberDb.addPurchase(selectedMember.id, {
          createdBy: STAFF,
          product: selectedProduct,
          amount,
        });

        // Update product amount
        productDb.decreaseAmount(selectedProduct.id, amount);

        successToast("Compra", "Compra realizada com sucesso");
        onSubmit(true);
      } catch (error) {
        errorToast("Compra", "Erro ao realizar ao comprar!");
        onSubmit(false);
      }
    }
  };

  if (!selectedMember) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
        {/* Product input */}
        <FormField
          control={form.control}
          name="product"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Produto</FormLabel>
              <FormControl>
                <ProductSelector
                  defaultValue={field.value}
                  value={field.value}
                  onValueChange={field.onChange}
                  onSelected={setSelectedProduct}
                />
              </FormControl>
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
              <FormLabel>Quantidade</FormLabel>
              <FormControl>
                <Input type="number" {...field} max={selectedProduct?.amount} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Payment resume */}
        {selectedProduct && amount > 0 && (
          <PurchasePaymentResume product={selectedProduct} amount={amount} />
        )}

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
