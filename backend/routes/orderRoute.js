import { Router } from "express";
import {
  getOrderDataById,
  initializeTransfer,
  orderData,
  paystackWebhook,
} from "../controller/orderController.js";

const isOrderRoute = Router();

isOrderRoute.post("/create-order", orderData);
isOrderRoute.get("/order-data/:id", getOrderDataById);
isOrderRoute.post("/initialize-transfer/:orderId", initializeTransfer);
isOrderRoute.post("/paystack/webhook", paystackWebhook);

export default isOrderRoute;
