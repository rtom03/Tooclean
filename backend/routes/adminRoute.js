import express from "express";
import {
  changePassword,
  createAdmin,
  loginAdmin,
} from "../controller/adminController.js";
import { healthCheck } from "../controller/healthController.js";

export const isAdminRoute = express.Router();

isAdminRoute.post("/sign-up", createAdmin);
isAdminRoute.post("/sign-in", loginAdmin);
isAdminRoute.post("/reset-passwd", changePassword);
