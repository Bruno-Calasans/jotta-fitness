import { DeepKeys } from "@tanstack/react-table";
// import getValueByDeepKey from "./getDeepestKey";

export default function groupBy<T, K extends keyof T>(
  items: T[],
  key: K,
): Record<string, T[]> {
  const groupedItems: Record<string, T[]> = {};

  for (const item of items) {
    const value = String(item[key]);
    // const value = String(getValueByDeepKey(item, key));

    if (!groupedItems[value]) {
      groupedItems[value] = [];
    }

    groupedItems[value].push(item);
  }

  return groupedItems;
}

// export default function groupBy() {
//   return null;
// }
