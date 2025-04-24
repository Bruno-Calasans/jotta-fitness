export default function calcDiscount(price: number, discount: number) {
  const pricePercentual = 1 - discount / 100;
  return price * pricePercentual;
}
