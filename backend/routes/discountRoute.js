import express from "express";
import {
  deleteDiscountCode,
  discountCode,
  getAllDiscountCodes,
  getDiscountCode,
  updateDiscountCode,
} from "../controller/discountController.js";

export const isDiscountRoute = express.Router();

isDiscountRoute.post("/create", discountCode);
isDiscountRoute.post("/update", updateDiscountCode);
isDiscountRoute.delete("/remove", deleteDiscountCode);
isDiscountRoute.get("/get-discounts", getAllDiscountCodes);
isDiscountRoute.get("/get-discount/:id", getDiscountCode);
