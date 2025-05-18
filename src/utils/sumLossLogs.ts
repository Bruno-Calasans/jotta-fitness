import type { LossLog } from "@/types/Log.type";
import sumNumbers from "./sumNumbers";

export default function sumLossLogs(lossLogs: LossLog[]) {
  if (lossLogs.length === 0) return 0;
  return lossLogs.map((log) => log.value).reduce(sumNumbers);
}
