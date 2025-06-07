import generateDefaultDbFields from "@/utils/generateDefaultDbFields";
import type { Member } from "@/types/Member.type";
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
  adhesionsPayments: [],
  diaries: [],
};

export const MEMBERS_DATA: Member[] = [
  {
    ...generateDefaultDbFields(),
    name: "James",
    phone: "81 9 12345678",
    role: null,
    enrollments: [],
    purchases: [],
    adhesionsPayments: [],
    diaries: [],
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
        createdAt: new Date(),
        startsIn: new Date(),
        expiresIn: addDays(new Date(), 10),
        createdBy: STAFF,
        lateFee: 0,
      },
    ],
    purchases: [
      {
        ...generateDefaultDbFields(),
        amount: 4,
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
    adhesionsPayments: [],
    diaries: [],
  },
  {
    ...generateDefaultDbFields(),
    name: "Jota",
    phone: "81 9 12345678",
    role: null,
    enrollments: [
      {
        ...generateDefaultDbFields(),
        months: 1,
        plan: PLANS_DATA[2],
        createdAt: addDays(new Date(), -31),
        startsIn: addDays(new Date(), -31),
        expiresIn: addDays(new Date(), -1),
        createdBy: STAFF,
        lateFee: 0,
      },
    ],
    purchases: [],
    adhesionsPayments: [],
    diaries: [],
  },
  {
    ...generateDefaultDbFields(),
    name: "Frederico",
    phone: "81 9 12345678",
    role: null,
    enrollments: [],
    purchases: [],
    adhesionsPayments: [],
    diaries: [],
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
    adhesionsPayments: [],
    diaries: [],
  },
];
