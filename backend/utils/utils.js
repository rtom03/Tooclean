const calculateSubtotal = (price, qty) => {
  const baseTotal = price * qty;

  let discount = 0;

  if (qty >= 5) {
    discount = 5000;
  } else if (qty === 3) {
    discount = 1000;
  } else if (qty === 2) {
    discount = 1000;
  }

  return {
    subtotal: baseTotal - discount,
    discount,
  };
};
