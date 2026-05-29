import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getLatestOrderByPhone,
  getOrderByOrderNumber,
  getOrderDataById,
  getPaymentInfo,
  initializeTransfer,
  mergePaymentOrder,
  orderAnalysis,
  paystackWebhook,
  updateOrderStatus,
  verifyTransaction,
} from "../controller/orderController.js";

const isOrderRoute = Router();

isOrderRoute.patch("/update-status/", updateOrderStatus);
isOrderRoute.patch("/merge-payment-order/:id", mergePaymentOrder);
isOrderRoute.post("/paystack/webhook", paystackWebhook);
isOrderRoute.get("/orders", getAllOrders);
isOrderRoute.get("/analytics", orderAnalysis);

isOrderRoute.get("/payment-info", getPaymentInfo);
isOrderRoute.get("/track/phone", getLatestOrderByPhone);
isOrderRoute.get("/track/order-number", getOrderByOrderNumber);
isOrderRoute.get("/order-data/:id", getOrderDataById);
isOrderRoute.get("/verify-payment/:reference", verifyTransaction);
isOrderRoute.post("/create-order", createOrder);
isOrderRoute.post("/initialize-transfer/:orderId", initializeTransfer);

export default isOrderRoute;
