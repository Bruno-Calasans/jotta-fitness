import { Member } from "@/types/Member.type";
import generateDefaultDbFields from "@/utils/generateDefaultDbFields";
import { addDays } from "date-fns";
import { PLANS_DATA } from "./PLANS_DATA";

export const MEMBERS_DATA: Member[] = [
  {
    ...generateDefaultDbFields(),
    name: "James",
    phone: "81 9 12345678",
    role: null,
    planPayments: [],
    productPayments: [],
  },
  {
    ...generateDefaultDbFields(),
    name: "Carlos",
    phone: "81 9 12345678",
    role: null,
    planPayments: [
      {
        ...generateDefaultDbFields(),
        months: 1,
        plan: PLANS_DATA[1],
        createdAt: addDays(new Date(), -31),
        startsIn: addDays(new Date(), -31),
        expiresIn: addDays(new Date(), -1),
        createdBy: {
          ...generateDefaultDbFields(),
          name: "James",
          phone: "81 9 12345678",
          role: null,
          planPayments: [],
          productPayments: [],
        },
      },
    ],
    productPayments: [],
  },
  {
    ...generateDefaultDbFields(),
    name: "Jota",
    phone: "81 9 12345678",
    role: null,
    planPayments: [],
    productPayments: [],
  },
  {
    ...generateDefaultDbFields(),
    name: "Frederico",
    phone: "81 9 12345678",
    role: null,
    planPayments: [],
    productPayments: [],
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
    planPayments: [],
    productPayments: [],
  },
];
