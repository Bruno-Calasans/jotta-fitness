import { Adhesion } from "@/types/Adhesion.type";
import generateDefaultDbFields from "@/utils/generateDefaultDbFields";
import { addDays } from "date-fns";

export const ADHESION_DATA: Adhesion[] = [
  {
    ...generateDefaultDbFields(),
    discountMaxDate: addDays(new Date(), 10),
    newbieDiscount: 20,
    veteranDiscount: 50,
    year: 2025,
  },
];
