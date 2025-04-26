import type { DB } from "./Db.typ";

export type Plan = DB & {
  name: string;
  trainTime: number;
  price: number;
  diary: number;
};
