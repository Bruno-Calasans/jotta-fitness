import { DB } from "./Db.typ";

export type AdhesionPayment = DB & {
  year: number;
  paidAt: Date;
};
