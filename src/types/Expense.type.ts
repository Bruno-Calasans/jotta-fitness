import type { DB } from "./Db.type";

export type Expense = DB & {
  name: string;
};
