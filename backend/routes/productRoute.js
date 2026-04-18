import { Router } from "express";

import { adminAuth } from "../middleware/authMiddleware.js";
import {
  addProductImages,
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  removeProductImage,
  updateProduct,
} from "../controller/productController.js";
import { upload } from "../middleware/uploadmiddleware.js";

const isProductRoute = Router();

// public
isProductRoute.get("/", getAllProducts);
isProductRoute.get("/:id", getProduct);

// protected — admin only
isProductRoute.post(
  "/create",
  adminAuth,
  upload.array("images", 10),
  createProduct,
);
isProductRoute.put(
  "/update/:id",
  adminAuth,
  upload.array("images", 10),
  updateProduct,
);
isProductRoute.delete("/delete/:id", adminAuth, deleteProduct);
isProductRoute.post(
  "/:id/images",
  adminAuth,
  upload.array("images", 10),
  addProductImages,
);
isProductRoute.delete("/:id/images", adminAuth, removeProductImage);

export default isProductRoute;
