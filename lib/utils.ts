export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price)
}

export function formatCurrency(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`
}
