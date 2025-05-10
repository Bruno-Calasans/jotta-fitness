import type { DB } from "./Db.type";

export type Adhesion = DB & {
  year: number;
  newbieDiscount: number;
  veteranDiscount: number;
  discountMaxDate: Date;
};
