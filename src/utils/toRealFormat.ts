export default function toRealFormat(value: number) {
  return `R$${value.toFixed(2)}`;
}
