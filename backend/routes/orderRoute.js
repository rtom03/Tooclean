import { Router } from "express";
import {
  getAllOrders,
  getLatestOrderByPhone,
  getOrderByOrderNumber,
  getOrderDataById,
  getPaymentInfo,
  initializeTransfer,
  mergePaymentOrder,
  orderData,
  paystackWebhook,
  updateOrderStatus,
} from "../controller/orderController.js";

const isOrderRoute = Router();

isOrderRoute.patch("/update-status/", updateOrderStatus);
isOrderRoute.patch("/merge-payment-order/:id", mergePaymentOrder);
isOrderRoute.post("/paystack/webhook", paystackWebhook);
isOrderRoute.get("/all-orders", getAllOrders);
isOrderRoute.get("/payment-info", getPaymentInfo);
isOrderRoute.get("/track/phone", getLatestOrderByPhone);
isOrderRoute.get("/track/order-number", getOrderByOrderNumber);
isOrderRoute.get("/order-data/:id", getOrderDataById);
isOrderRoute.post("/create-order", orderData);
isOrderRoute.post("/initialize-transfer/:orderId", initializeTransfer);

export default isOrderRoute;
