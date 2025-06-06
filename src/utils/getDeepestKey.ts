// type DeepKeys<T> = T extends object
//   ? {
//       [K in keyof T]-?: K extends string | number
//         ? `${K}` | `${K}.${DeepKeys<T[K]>}`
//         : never;
//     }[keyof T]
//   : never;

// export default function getValueByDeepKey<T, K extends DeepKeys<T>>(
//   obj: T,
//   key: K
// ): any {
//   const keys = (key as string).split(".") as (keyof T)[];
//   let result: Record<string, > = obj;
//   for (const k of keys) {
//     result = result[k];
//   }
//   return result;
// }

export default function getValueByDeepKey() {
  return null;
}
