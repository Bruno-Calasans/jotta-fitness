import { Member } from "@/types/Member.type";
import generateDefaultDbFields from "@/utils/generateDefaultDbFields";
import { addDays } from "date-fns";
import { PLANS_DATA } from "./PLANS_DATA";
import { PRODUCTS_DATA } from "./PRODUCTS_DATA";

export const STAFF: Member = {
  ...generateDefaultDbFields(),
  name: "Jota",
  phone: "81 9 12345678",
  role: null,
  enrollments: [],
  purchases: [],
};

export const MEMBERS_DATA: Member[] = [
  {
    ...generateDefaultDbFields(),
    name: "James",
    phone: "81 9 12345678",
    role: null,
    enrollments: [],
    purchases: [],
  },
  {
    ...generateDefaultDbFields(),
    name: "Carlos",
    phone: "81 9 12345678",
    role: null,
    enrollments: [
      {
        ...generateDefaultDbFields(),
        months: 1,
        plan: PLANS_DATA[1],
        createdAt: addDays(new Date(), -31),
        startsIn: addDays(new Date(), -31),
        expiresIn: addDays(new Date(), -1),
        createdBy: STAFF,
      },
    ],
    purchases: [
      {
        ...generateDefaultDbFields(),
        amount: 1,
        product: PRODUCTS_DATA[0],
        createdBy: STAFF,
      },
      {
        ...generateDefaultDbFields(),
        amount: 2,
        product: PRODUCTS_DATA[1],
        createdBy: STAFF,
      },
    ],
  },
  {
    ...generateDefaultDbFields(),
    name: "Jota",
    phone: "81 9 12345678",
    role: null,
    enrollments: [],
    purchases: [],
  },
  {
    ...generateDefaultDbFields(),
    name: "Frederico",
    phone: "81 9 12345678",
    role: null,
    enrollments: [],
    purchases: [],
  },
  {
    ...generateDefaultDbFields(),
    name: "Amanda",
    phone: "81 9 12345678",
    role: {
      ...generateDefaultDbFields(),
      name: "Admin",
      permissions: [
        {
          ...generateDefaultDbFields(),
          actions: ["all"],
          resource: "all",
        },
      ],
    },
    enrollments: [],
    purchases: [],
  },
];
