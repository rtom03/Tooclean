import type { InitializePaymentResponse } from "./index.type";

export const DELIVERY_RATES = [
  { state: "Lagos", price: 2700 },

  { state: "Ekiti", price: 4569 },
  { state: "Ondo", price: 4569 },
  { state: "Oyo", price: 4569 },
  { state: "Ogun", price: 4569 },
  { state: "Osun", price: 4569 },

  { state: "Akwa Ibom", price: 6719 },
  { state: "Cross River", price: 5644 },
  { state: "Rivers", price: 5644 },
  { state: "Delta", price: 5644 },
  { state: "Edo", price: 5644 },
  { state: "Bayelsa", price: 5644 },

  { state: "Niger", price: 6450 },
  { state: "Benue", price: 6450 },
  { state: "Plateau", price: 6450 },
  { state: "Kogi", price: 6450 },
  { state: "FCT", price: 6181 },
  { state: "Kwara", price: 5644 },
  { state: "Nasarawa", price: 6450 },

  { state: "Enugu", price: 5644 },
  { state: "Anambra", price: 5644 },
  { state: "Imo", price: 5644 },
  { state: "Abia", price: 5644 },
  { state: "Ebonyi", price: 5644 },

  { state: "Jigawa", price: 6450 },
  { state: "Kano", price: 6450 },
  { state: "Kaduna", price: 6450 },
  { state: "Zamfara", price: 6450 },
  { state: "Sokoto", price: 6450 },
  { state: "Kebbi", price: 6450 },
  { state: "Katsina", price: 6450 },

  { state: "Gombe", price: 6450 },
  { state: "Bauchi", price: 6450 },
  { state: "Borno", price: 6450 },
  { state: "Adamawa", price: 6450 },
  { state: "Taraba", price: 6450 },
  { state: "Yobe", price: 6450 },
];

export const calculateSubtotal = (price: number, qty: number) => {
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

export const normalizePaymentData = (data: any): InitializePaymentResponse => {
  return {
    message: "Payment info fetched successfully",

    payment_info: {
      id: data?.payment_info?.id,

      name: data?.payment_info?.customerName,

      email: data.payment_info.email,

      phone: data.payment_info.phone,

      address: data.payment_info.address,

      state: data.payment_info.state,

      orderDetails: data.payment_info.orderDetails.id,

      orderNumber: data.payment_info.orderNumber,

      total: data.payment_info.total,

      bankName: data.payment_info.dedicatedBankName,

      accountNumber: data.payment_info.dedicatedAccountNo,

      accountName: data.payment_info.dedicatedAccountName,
      amount: data.payment_info.total,

      paymentStatus: data.payment_info.paymentStatus,
      amountPaid: data.payment_info.amountPaid,
      balanceRemaining: data.payment_info.balanceRemaining,

      deliveryPrice: data.payment_info.deliveryPrice,
    },
  };
};
