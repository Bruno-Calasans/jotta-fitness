import type { DB } from "./Db.type";

export type Product = DB & {
  name: string;
  price: number;
  amount: number;
};
