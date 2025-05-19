import { DB } from "./Db.type";

export type Resources =
  | "all"
  | "product"
  | "plan"
  | "expense"
  | "investment"
  | "member"
  | "staff"
  | "register";

export type PermissionActions = "create" | "read" | "update" | "delete" | "all";

export type Permission = DB & {
  resource: Resources;
  actions: PermissionActions[];
};

export type Role = DB & {
  name: string;
  permissions: Permission[];
};
