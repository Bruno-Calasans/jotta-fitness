import type { Product } from "@/types/Product.type";

type PurchaseResumeProps = {
  data: {
    product: Product;
    amount: number;
  };
};

export default function PurchasePaymentResume({
  data: { product, amount },
}: PurchaseResumeProps) {
  return (
    <div>
      {/* Title */}
      <p className="text-2xl font-bold border-b-2 border-orange-500 mb-2">
        Resumo de pagamento
      </p>
      {/* Product Value */}
      <p className="text-stone-800 text-lg">
        Valor do produto: R$ {product.price.toFixed(2)}
      </p>
      {/* Product amount */}
      <p className="text-stone-800 text-lg">Quantidade: {amount}</p>
      {/* Total */}
      <p className="font-semibold italic border-t-2 border-orange-500 mt-2 text-lg">
        Total a pagar: R${(amount * product.price).toFixed(2)}
      </p>
    </div>
  );
}
