import { Router } from "express";
import { getOrderDataById, orderData } from "../controller/orderController.js";

const isOrderRoute = Router();

isOrderRoute.post("/create-order-data", orderData);
isOrderRoute.get("/order-data/:id", getOrderDataById);

export default isOrderRoute;
