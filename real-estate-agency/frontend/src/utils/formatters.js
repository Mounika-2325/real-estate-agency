/**
 * Format Indian Currency Price (Lakhs / Crores / Monthly Rent)
 */
export const formatPrice = (price, listingType = 'Sale') => {
  if (price === undefined || price === null || isNaN(price)) return '₹ --';

  const isRent = listingType.toLowerCase() === 'rent' || listingType.toLowerCase() === 'for rent';

  if (isRent) {
    return `₹ ${price.toLocaleString('en-IN')}/mo`;
  }

  if (price >= 10000000) {
    const crores = price / 10000000;
    return `₹ ${crores.toFixed(crores % 1 === 0 ? 0 : 2)} Cr`;
  } else if (price >= 100000) {
    const lakhs = price / 100000;
    return `₹ ${lakhs.toFixed(lakhs % 1 === 0 ? 0 : 2)} Lakh`;
  }

  return `₹ ${price.toLocaleString('en-IN')}`;
};

/**
 * Format Area in sq.ft
 */
export const formatArea = (area) => {
  if (!area) return '0 sq.ft';
  return `${Number(area).toLocaleString('en-IN')} sq.ft`;
};
