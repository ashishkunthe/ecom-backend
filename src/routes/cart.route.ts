import { Router } from "express";
import { userAuthMiddleware } from "../middlewares/authMiddleware";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../controller/cart.controller";

const router = Router();

router.post("/add", userAuthMiddleware, addToCart as any);
router.get("/", userAuthMiddleware, getCart as any);
router.post("/remove", userAuthMiddleware, removeFromCart as any);
router.post("/update", userAuthMiddleware, updateCartQuantity as any);

// checkout functionality

router.post("/checkout", userAuthMiddleware);

export default router;
