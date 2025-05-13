export function calculateDiscount(price: number, discountPrice: number) {
  if (!price || !discountPrice) {
    return 0;
  }
  const discount = ((price - discountPrice) / price) * 100;
  return Math.round(discount);
}