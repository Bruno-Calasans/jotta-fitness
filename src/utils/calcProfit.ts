import sumNumbers from "./sumNumbers";

export default function calcProfit(gains: number[], losses: number[]) {
  return gains.reduce(sumNumbers) - losses.reduce(sumNumbers);
}
