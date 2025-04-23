import { Adhesion } from "@/types/Adhesion.type";
import generateDefaultDbFields from "@/utils/generateDefaultDbFields";

export const ADHESION_DATA: Adhesion[] = [
  {
    ...generateDefaultDbFields(),
    discountMaxDate: new Date(),
    newbieDiscount: 20,
    veteranDiscount: 50,
    year: 2025,
  },
];
