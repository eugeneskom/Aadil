import { Product } from "../types/Product";

export const calculateSalePercentage = (product: Product): number | null => {
  const { CurrentPrice, OriginalPrice } = product;

  if (!OriginalPrice || OriginalPrice === '0.00' || OriginalPrice === CurrentPrice) {
    return null;
  }

  const currentPrice = parseFloat(CurrentPrice);
  const originalPrice = parseFloat(OriginalPrice);

  if (isNaN(currentPrice) || isNaN(originalPrice) || originalPrice <= currentPrice) {
    return null;
  }

  const salePercentage = ((originalPrice - currentPrice) / originalPrice) * 100;
  return Math.round(salePercentage);
};