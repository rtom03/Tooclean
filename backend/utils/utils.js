export const generateDiscountCode = (name) => {
  const cleanedName = name.replace(/\s+/g, "").toUpperCase();

  const random = Math.random().toString(36).substring(2, 6).toUpperCase();

  return `${cleanedName}-${random}`;
};
