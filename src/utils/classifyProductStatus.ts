import { Product, PRODUCT_STATUS } from "@/types/Product.type";

export default function classifyProductStatus({ amount }: Product) {
  if (amount === 0) return PRODUCT_STATUS.UNAVALIABLE;
  else if (amount > 0) return PRODUCT_STATUS.AVALIABLE;
  return PRODUCT_STATUS.EXPIRED;
}
