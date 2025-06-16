import type { DB } from "./Db.type";

export type Product = DB & {
  name: string;
  price: number;
  amount: number;
  expiredAmount: number;
};

export enum PRODUCT_STATUS {
  UNAVALIABLE,
  EXPIRED,
  AVALIABLE,
}
