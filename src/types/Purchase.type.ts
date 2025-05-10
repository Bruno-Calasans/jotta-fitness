import type { DB } from "./Db.type";
import type { Product } from "./Product.type";

export type Purchase = DB & {
  product: Product;
  amount: number;
};
