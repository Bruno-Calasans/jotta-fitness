import type { AdhesionPayment } from "@/types/AdhesionPayment.type";
import generateDefaultDbFields from "./generateDefaultDbFields";

export default function createAdhesionPayment(input: Partial<AdhesionPayment>) {
  return {
    ...generateDefaultDbFields(),
    paidAt: new Date(),
    ...input,
  } as AdhesionPayment;
}
