import { Member } from "./Member.type";

export type DB = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: Member;
};
