import { DB } from "./Db.typ";

export type Investment = DB & {
  name: string;
};
