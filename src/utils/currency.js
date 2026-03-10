/**
 * Format an amount in BDT (Bangladeshi Taka) with the ৳ symbol.
 * @param {number} amount
 * @param {'en'|'bn'} locale
 */
export function formatBDT(amount, locale = 'en') {
  const formatted = new Intl.NumberFormat(locale === 'bn' ? 'bn-BD' : 'en-IN', {
    maximumFractionDigits: 0,
  }).format(amount);
  return `৳${formatted}`;
}

/** Format USD for international display */
export function formatUSD(amount) {
  return new Intl.NumberFormat('en-US', {
    style:    'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Calculate installment amount */
export function calcInstallment(total, parts = 2) {
  return Math.ceil(total / parts);
}
