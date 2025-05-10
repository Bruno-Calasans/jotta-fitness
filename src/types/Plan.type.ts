import type { DB } from "./Db.type";

export type Plan = DB & {
  name: string;
  trainTime: number;
  price: number;
  diary: number;
};
