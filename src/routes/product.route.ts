import { Router } from "express";
import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from "../middlewares/authMiddleware";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controller/product.controller";

const route = Router();

route.post("/add-product", adminAuthMiddleware, addProduct as any);
route.post("/update-product/:id", adminAuthMiddleware, updateProduct as any);
route.post("/delete-product/:id", adminAuthMiddleware, deleteProduct as any);
route.post("/get-products", userAuthMiddleware, getProducts as any);
route.post("/get-product/:id", userAuthMiddleware, getProduct as any);

export default route;
 