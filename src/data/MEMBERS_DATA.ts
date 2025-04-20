import { Member } from "@/types/Member.type";
import generateDefaultDbFields from "@/utils/generateDefaultDbFields";

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
    planPayments: [],
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
