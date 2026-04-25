import express from "express";
import { healthCheck } from "../controller/healthController.js";
import { isAdminRoute } from "./adminRoute.js";
import isProductRoute from "./productRoute.js";
import isOrderRoute from "./orderRoute.js";

const routes = express.Router();

routes.get("/health", healthCheck);
routes.use("/admin", isAdminRoute);
routes.use("/products", isProductRoute);
routes.use("/order", isOrderRoute);

export default routes;
