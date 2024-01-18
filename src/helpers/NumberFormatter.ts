export const formatNumberWithSpace = (total: string) => {
  if (!total) return "";

  return parseFloat(total)
    .toLocaleString("en-US", { minimumFractionDigits: 2 })
    .replace(/,/g, " ");
};

export const formatCurrencyAmount = (amount: string) =>
  new Intl.NumberFormat("en-US").format(+amount);
