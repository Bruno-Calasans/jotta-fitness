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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import useCustomToast from "@/hooks/use-custom-toast";
import { useMemberStore } from "@/store/memberStore";
import { useState } from "react";
import PurchasePaymentResume from "../../Members/Purchases/PurchasePaymentResume";
import type { PurchaseLog } from "@/types/Log.type";
import MemberSelector from "../MemberSelector";
import { Member } from "@/types/Member.type";
import { useLogStore } from "@/store/logStore";
import { STAFF } from "@/data/MEMBERS_DATA";
import { ProductSelector } from "../../Members/Purchases/ProductSelector";
import { Product } from "@/types/Product.type";
import { useProductStore } from "@/store/productStore";
import RequiredFieldTooltip from "@/components/custom/RequiredFieldTooltip";
import createPurchase from "@/utils/createPurchase";
import updatePurchase from "@/utils/updatePurchase";

const purchaseLogFormSchema = z.object({
  member: z.string().optional(),
  product: z.string().min(1, "Produto é obrigatório"),
  amount: z.coerce.number().min(1, "Quantidade deve ser maior ou igual a 1"),
});

type SubscribePlanFormInputs = z.infer<typeof purchaseLogFormSchema>;

type PurchaseLogFormProps = {
  purchaseLog?: PurchaseLog;
  onSubmit: (success: boolean) => void;
};

export default function PurchaseLogForm({
  purchaseLog,
  onSubmit,
}: PurchaseLogFormProps) {
  const logDb = useLogStore();
  const memberDb = useMemberStore();
  const productDb = useProductStore();
  const { successToast, errorToast } = useCustomToast();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    purchaseLog?.purchase.product || null
  );
  const [selectedMember, setSelectedMember] = useState<Member | null>(
    purchaseLog?.member || null
  );

  const form = useForm<SubscribePlanFormInputs>({
    resolver: zodResolver(purchaseLogFormSchema),
    defaultValues: {
      member: purchaseLog?.member?.name || "",
      product: purchaseLog?.purchase.product.name || "",
      amount: purchaseLog?.purchase.amount || 1,
    },
  });

  const amount = useWatch({ name: "amount", control: form.control });

  const submitHandler = (input: SubscribePlanFormInputs) => {
    if (!selectedProduct) return;

    // Update purchase log
    if (purchaseLog) {
      try {
        form.reset();

        // Registered Member
        if (selectedMember) {
          const purchase = memberDb.updatePurchase(
            selectedMember.id,
            purchaseLog.purchase.id,
            {
              product: selectedProduct,
              amount,
            }
          );

          // Update purchase log
          if (purchase)
            logDb.update(purchaseLog.id, {
              type: "purchase",
              member: selectedMember,
              purchase,
            });
          // Update not registered member
        } else {
          logDb.update(purchaseLog.id, {
            type: "purchase",
            purchase: updatePurchase(purchaseLog.purchase, {
              amount,
              product: selectedProduct,
            }),
          });
        }

        // Update product amount
        const amountDiff = amount - purchaseLog.purchase.amount;

        if (amountDiff > 0) {
          productDb.decreaseAmount(selectedProduct.id, amountDiff);
        }

        if (amountDiff < 0) {
          productDb.increaseAmount(selectedProduct.id, amountDiff);
        }

        // Show success message
        successToast(
          "Atualização de Registro de Compra",
          "Registro atualizada com sucesso"
        );
        onSubmit(true);
      } catch (error) {
        errorToast(
          "Atualização de Registro de Compra",
          "Erro ao atualizar registro"
        );
        onSubmit(false);
      }
      // Create purchase log
    } else {
      try {
        form.reset();

        // Registered member
        if (selectedMember) {
          const purchase = memberDb.addPurchase(selectedMember.id, {
            amount,
            product: selectedProduct,
          });

          // create purchase log
          if (purchase)
            logDb.add({
              type: "purchase",
              purchase,
              member: selectedMember,
              createdBy: STAFF,
            });
          // Not registered member
        } else {
          logDb.add({
            type: "purchase",
            purchase: createPurchase({
              amount,
              product: selectedProduct,
            }),
            createdBy: STAFF,
          });
        }

        // Update product amount
        productDb.decreaseAmount(selectedProduct.id, amount);

        successToast("Registro de Compra", "Registro criado com sucesso");
        onSubmit(true);
      } catch (error) {
        errorToast("Registro de Compra", "Erro ao registrar Compra");
        onSubmit(false);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
        {/* Member input */}
        <FormField
          control={form.control}
          name="member"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Membro</FormLabel>
              <FormControl>
                <MemberSelector
                  value={field.value}
                  onValueChange={field.onChange}
                  onItemSelected={setSelectedMember}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Deixe em branco caso seja um membro não registrado.
              </FormDescription>
            </FormItem>
          )}
        />

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
              <FormLabel>
                <RequiredFieldTooltip>Quantidade</RequiredFieldTooltip>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Quantidade"
                  max={selectedProduct?.amount}
                  onPaste={(e) => e.preventDefault()}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PPurchase Payment resume */}
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
            {purchaseLog ? "Salvar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
