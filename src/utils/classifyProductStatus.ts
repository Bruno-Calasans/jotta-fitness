import { Product, PRODUCT_STATUS } from "@/types/Product.type";

export default function classifyProductStatus({
  amount,
  expiredAmount,
}: Product) {
  if (amount === 0) return PRODUCT_STATUS.UNAVALIABLE;
  else if (expiredAmount > 0) return PRODUCT_STATUS.EXPIRED;
  return PRODUCT_STATUS.AVALIABLE;
}
