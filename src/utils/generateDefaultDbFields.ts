import { DB } from "@/types/Db.typ";
import { v4 } from "uuid";

export default function generateDbFields() {
  return {
    id: v4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  } as DB;
}
