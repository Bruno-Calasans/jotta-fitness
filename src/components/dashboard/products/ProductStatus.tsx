import { Badge } from "@/components/ui/badge";
import { Product, PRODUCT_STATUS } from "@/types/Product.type";
import classifyProductStatus from "@/utils/classifyProductStatus";

type ProductStatusProps = {
  product: Product;
};

export default function ProductStatus({ product }: ProductStatusProps) {
  const productStatus = classifyProductStatus(product);

  if (productStatus === PRODUCT_STATUS.AVALIABLE) {
    return (
      <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white transition-all cursor-pointer">
        Disponível
      </Badge>
    );
  }

  if (productStatus === PRODUCT_STATUS.UNAVALIABLE) {
    return (
      <Badge className="bg-red-500 hover:bg-red-600 text-white transition-all cursor-pointer">
        Indisponível
      </Badge>
    );
  }

  return (
    <Badge className="bg-orange-500 hover:bg-orange-600 text-white transition-all cursor-pointer">
      Expirado
    </Badge>
  );
}
