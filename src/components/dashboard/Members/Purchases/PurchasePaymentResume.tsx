import { Product } from "@/types/Product.type";

type PurchaseResumeProps = {
  product: Product;
  amount: number;
};

export default function PurchasePaymentResume({
  product,
  amount,
}: PurchaseResumeProps) {
  return (
    <div>
      <p className="text-2xl font-bold border-b-2 border-orange-500 mb-2">
        Resumo de pagamento
      </p>
      <p className="text-stone-800 text-lg">
        Valor do produto: R$ {product.price.toFixed(2)}
      </p>
      <p className="text-stone-800 text-lg">Quantidade: {amount}</p>
      <p className="font-semibold italic border-t-2 border-orange-500 mt-2 text-lg">
        Total a pagar: R${(amount * product.price).toFixed(2)}
      </p>
    </div>
  );
}
