import express from "express";
import { healthCheck } from "../controller/healthController.js";
import { isAdminRoute } from "./adminRoute.js";
import isProductRoute from "./productRoute.js";
import isOrderRoute from "./orderRoute.js";
import { isDiscountRoute } from "./discountRoute.js";

const routes = express.Router();

routes.use("/order", isOrderRoute);
routes.get("/health", healthCheck);
routes.use("/admin", isAdminRoute);
routes.use("/products", isProductRoute);
routes.use("/discount", isDiscountRoute);

export default routes;
