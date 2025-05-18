import type { AdhesionLog } from "@/types/Log.type";
import calcAdhesionPrice from "./calcAdhesionPrice";
import sumNumbers from "./sumNumbers";

export default function sumAdhesionLogs(adhesionLogs: AdhesionLog[]) {
  if (adhesionLogs.length === 0) return 0;
  return adhesionLogs
    .map(({ adhesion, plan, member }) =>
      calcAdhesionPrice(adhesion, plan, member)
    )
    .reduce(sumNumbers);
}
