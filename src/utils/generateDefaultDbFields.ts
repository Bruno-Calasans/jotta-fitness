import { DB } from "@/types/Db.type";
import { v4 } from "uuid";

export default function generateDbFields(): DB {
  return {
    id: v4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  } as DB;
}
