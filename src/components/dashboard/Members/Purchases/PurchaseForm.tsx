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
import useCustomToast from "@/hooks/use-custom-toast";
import { useMemberStore } from "@/store/memberStore";
import { useEffect, useState } from "react";
import { Purchase } from "@/types/Purchase.type";
import { Product } from "@/types/Product.type";
import ProductSelector from "./ProductSelector";
import PurchasePaymentResume from "./PurchasePaymentResume";
import { useProductStore } from "@/store/productStore";
import RequiredFieldTooltip from "@/components/custom/others/RequiredFieldTooltip";
import CancelButton from "@/components/custom/buttons/CancelButton";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import { useLogStore } from "@/store/logStore";
import { STAFF } from "@/data/MEMBERS_DATA";

const purchaseFormSchema = z.object({
  product: z.string().min(1, "Produto é obrigatório"),
  amount: z.coerce.number().min(1, "Quantidade deve ser maior ou igual a 1"),
});

type SubscribePlanFormInputs = z.infer<typeof purchaseFormSchema>;

type PurchaseFormProps = {
  purchase?: Purchase;
  onSubmit: (success: boolean) => void;
};

export default function PurchaseForm({
  purchase,
  onSubmit,
}: PurchaseFormProps) {
  const { selectedMember, updatePurchase, addPurchase } = useMemberStore();
  const productDb = useProductStore();
  const logDb = useLogStore();
  const { successToast, errorToast } = useCustomToast();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    purchase?.product || null
  );

  const form = useForm<SubscribePlanFormInputs>({
    resolver: zodResolver(purchaseFormSchema),
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

        const updatedPurchase = updatePurchase(selectedMember.id, purchase.id, {
          product: selectedProduct,
          amount,
        });

        const purchaseLog = logDb.getByPurchaseId(purchase.id);

        // Update amount
        const amountDiff = amount - purchase.amount;

        if (amountDiff > 0) {
          productDb.decreaseAmount(selectedProduct.id, amountDiff);
        }

        if (amountDiff < 0) {
          productDb.increaseAmount(selectedProduct.id, amountDiff);
        }

        if (updatedPurchase && purchaseLog)
          logDb.update(purchaseLog.id, {
            type: "purchase",
            member: selectedMember,
            purchase: updatedPurchase,
          });

        successToast("Atualização de Compra", "Atualizada com sucesso");
        onSubmit(true);
      } catch (error) {
        errorToast("Atualização de Compra", "Erro ao atualizar");
        onSubmit(false);
      }
    } else {
      try {
        form.reset();
        // start loading

        // Save to database
        const purchase = addPurchase(selectedMember.id, {
          product: selectedProduct,
          amount,
        });

        // Update product amount
        productDb.decreaseAmount(selectedProduct.id, amount);

        if (purchase)
          logDb.add({
            type: "purchase",
            member: selectedMember,
            purchase,
            createdBy: STAFF,
          });

        successToast("Criação de compra", "Criado com sucesso");
        onSubmit(true);
      } catch (error) {
        errorToast("Criação de compra", "Erro ao criar compra");
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
              <FormLabel>
                <RequiredFieldTooltip>Produto</RequiredFieldTooltip>
              </FormLabel>
              <FormControl>
                <ProductSelector
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
              <RequiredFieldTooltip>Quantidade</RequiredFieldTooltip>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1"
                  max={selectedProduct?.amount}
                  onPaste={(e) => e.preventDefault()}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Payment resume */}
        {selectedProduct && amount > 0 && (
          <PurchasePaymentResume
            data={{
              product: selectedProduct,
              amount,
            }}
          />
        )}

        {/* Form Actions */}
        <div className="flex justify-end gap-1">
          <CancelButton />
          <ConfirmButton isEditing={!!purchase} />
        </div>
      </form>
    </Form>
  );
}
