import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, lang: string) {
  if (lang === "en") {
    // 1:8 conversion rate: price is in Q, so divide by 8 for USD
    const usdPrice = price / 8;
    return usdPrice.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
  return price.toLocaleString("es-GT", {
    style: "currency",
    currency: "GTQ",
    currencyDisplay: "symbol",
  }).replace("GTQ", "Q.");
}
