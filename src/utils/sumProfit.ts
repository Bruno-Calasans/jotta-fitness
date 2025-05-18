import sumNumbers from "./sumNumbers";

export default function sumProfit(gains: number[], losses: number[]) {
  return gains.reduce(sumNumbers) - losses.reduce(sumNumbers);
}
