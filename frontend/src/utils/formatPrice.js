/**
 * Format a number as a currency string
 * @param {number} price - The price to format
 * @param {string} currency - The currency code (default: 'USD')
 * @param {string} locale - The locale to use (default: 'en-US')
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, currency = 'USD', locale = 'en-US') => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '$0.00';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

/**
 * Format price with original price showing discount
 * @param {number} price - Current price
 * @param {number} originalPrice - Original price
 * @param {string} currency - Currency code
 * @param {string} locale - Locale
 * @returns {Object} Formatted prices and discount info
 */
export const formatPriceWithDiscount = (price, originalPrice, currency = 'USD', locale = 'en-US') => {
  const formattedPrice = formatPrice(price, currency, locale);
  let formattedOriginalPrice = null;
  let discountPercentage = null;
  let savings = null;

  if (originalPrice && originalPrice > price) {
    formattedOriginalPrice = formatPrice(originalPrice, currency, locale);
    savings = originalPrice - price;
    discountPercentage = Math.round((savings / originalPrice) * 100);
  }

  return {
    current: formattedPrice,
    original: formattedOriginalPrice,
    discountPercentage,
    savings: savings ? formatPrice(savings, currency, locale) : null,
    hasDiscount: !!originalPrice && originalPrice > price
  };
};

/**
 * Format price for display without currency symbol
 * @param {number} price - The price to format
 * @returns {string} Formatted price without currency symbol
 */
export const formatPriceNumber = (price) => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '0.00';
  }
  return price.toFixed(2);
};

/**
 * Get currency symbol for a given currency code
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Currency symbol
 */
export const getCurrencySymbol = (currency = 'USD') => {
  const symbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CAD: 'C$',
    AUD: 'A$',
    CHF: 'Fr',
    CNY: '¥',
    INR: '₹',
    BRL: 'R$',
  };
  return symbols[currency] || '$';
};

/**
 * Format price range
 * @param {number} min - Minimum price
 * @param {number} max - Maximum price
 * @param {string} currency - Currency code
 * @param {string} locale - Locale
 * @returns {string} Formatted price range
 */
export const formatPriceRange = (min, max, currency = 'USD', locale = 'en-US') => {
  const formattedMin = formatPrice(min, currency, locale);
  const formattedMax = formatPrice(max, currency, locale);
  return `${formattedMin} - ${formattedMax}`;
};

/**
 * Format price for SEO (structured data)
 * @param {number} price - The price
 * @param {string} currency - Currency code
 * @returns {Object} Price object for schema markup
 */
export const getPriceSchema = (price, currency = 'USD') => {
  return {
    '@type': 'PriceSpecification',
    price: price,
    priceCurrency: currency,
  };
};

/**
 * Check if price is within range
 * @param {number} price - Price to check
 * @param {number} min - Minimum price
 * @param {number} max - Maximum price
 * @returns {boolean} True if price is within range
 */
export const isPriceInRange = (price, min, max) => {
  return price >= min && price <= max;
};

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} salePrice - Sale price
 * @returns {number} Discount percentage
 */
export const calculateDiscount = (originalPrice, salePrice) => {
  if (!originalPrice || originalPrice <= salePrice) {
    return 0;
  }
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

/**
 * Format price as words (e.g., "$1,234.56" -> "One thousand two hundred thirty-four dollars and fifty-six cents")
 * @param {number} price - The price to format
 * @param {string} currency - Currency code
 * @returns {string} Price in words
 */
export const formatPriceAsWords = (price, currency = 'USD') => {
  if (typeof price !== 'number' || isNaN(price) || price < 0) {
    return 'Zero';
  }

  const units = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
  const words = (n) => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
      'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen',
      'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? '-' + ones[n % 10] : '');
    return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + words(n % 100) : '');
  };

  const currencySymbol = getCurrencySymbol(currency);
  const dollars = Math.floor(price);
  const cents = Math.round((price - dollars) * 100);

  let result = '';
  let chunkIndex = 0;
  let num = dollars;

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk) {
      result = words(chunk) + (units[chunkIndex] ? ' ' + units[chunkIndex] : '') + (result ? ' ' + result : '');
    }
    num = Math.floor(num / 1000);
    chunkIndex++;
  }

  result = result || 'Zero';
  result += ` ${currencySymbol}`;

  if (cents > 0) {
    result += ` and ${cents} cents`;
  }

  return result;
};

/**
 * Get VAT/Tax inclusive price
 * @param {number} price - Base price
 * @param {number} taxRate - Tax rate as percentage (e.g., 8 for 8%)
 * @returns {Object} Price with tax
 */
export const getPriceWithTax = (price, taxRate = 8) => {
  const taxAmount = (price * taxRate) / 100;
  const total = price + taxAmount;
  return {
    basePrice: price,
    taxRate: taxRate,
    taxAmount: taxAmount,
    total: total,
    formattedBase: formatPrice(price),
    formattedTax: formatPrice(taxAmount),
    formattedTotal: formatPrice(total),
  };
};

/**
 * Format bulk pricing
 * @param {Array} priceBreaks - Array of {quantity, price} objects
 * @param {string} currency - Currency code
 * @returns {Array} Formatted price breaks
 */
export const formatBulkPricing = (priceBreaks, currency = 'USD') => {
  return priceBreaks.map((breakpoint) => ({
    ...breakpoint,
    formattedPrice: formatPrice(breakpoint.price, currency),
    savings: breakpoint.originalPrice 
      ? calculateDiscount(breakpoint.originalPrice, breakpoint.price)
      : 0
  }));
};

/**
 * Parse price from string (remove currency symbols, commas, etc.)
 * @param {string} priceString - Price string to parse
 * @returns {number} Parsed price as number
 */
export const parsePriceString = (priceString) => {
  if (!priceString) return 0;
  const cleaned = priceString.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
};

// Default export with all functions
export default {
  formatPrice,
  formatPriceWithDiscount,
  formatPriceNumber,
  getCurrencySymbol,
  formatPriceRange,
  getPriceSchema,
  isPriceInRange,
  calculateDiscount,
  formatPriceAsWords,
  getPriceWithTax,
  formatBulkPricing,
  parsePriceString,
};