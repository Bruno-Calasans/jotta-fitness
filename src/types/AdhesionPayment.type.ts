import { DB } from "./Db.type";

export type AdhesionPayment = DB & {
  year: number;
  paidAt: Date;
};
