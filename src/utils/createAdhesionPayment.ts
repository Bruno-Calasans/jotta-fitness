import type { AdhesionPayment } from "@/types/AdhesionPayment.type";
import generateDefaultDbFields from "./generateDefaultDbFields";

export default function createAdhesionPayment() {
  return {
    ...generateDefaultDbFields(),
    paidAt: new Date(),
    year,
  } as AdhesionPayment;
}
