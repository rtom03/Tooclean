import { Router } from "express";
import {
  getAllOrders,
  getOrder,
  getOrderDataById,
  initializeTransfer,
  orderData,
  paystackWebhook,
  updateOrderStatus,
} from "../controller/orderController.js";

const isOrderRoute = Router();

isOrderRoute.patch("/update-status/", updateOrderStatus);
isOrderRoute.post("/paystack/webhook", paystackWebhook);
isOrderRoute.get("/all-orders", getAllOrders);
isOrderRoute.get("/order/:id", getOrder);
isOrderRoute.get("/order-data/:id", getOrderDataById);
isOrderRoute.post("/create-order", orderData);
isOrderRoute.post("/initialize-transfer/:orderId", initializeTransfer);

export default isOrderRoute;
