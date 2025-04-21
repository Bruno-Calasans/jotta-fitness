import type { DB } from "./Db.typ";
import type { Member } from "./Member.type";
import type { Product } from "./Product.type";

export type Purchase = DB & {
  product: Product;
  amount: number;
  createdBy: Member;
};
