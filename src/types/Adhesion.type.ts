import type { DB } from "./Db.typ";

export type Adhesion = DB & {
  year: number;
  price: number;
  newbieDiscount: number;
  veteranDiscount: number;
  discountMaxDate: Date;
};
