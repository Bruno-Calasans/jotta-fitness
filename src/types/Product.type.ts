import type { DB } from "./Db.typ";

export type Product = DB & {
  name: string;
  price: number;
  amount: number;
};
