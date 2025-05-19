import { DB } from "./Db.type";

export type Investment = DB & {
  name: string;
};
