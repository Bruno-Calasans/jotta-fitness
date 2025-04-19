import type { DB } from "./Db.typ";

export type Expense = DB & {
  name: string;
};
