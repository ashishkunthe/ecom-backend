import { Router } from "express";
import { userAuthMiddleware } from "../middlewares/authMiddleware";
import { getActiveDiscounts } from "../controller/discount.controller";

const router = Router();

router.get("/active", userAuthMiddleware, getActiveDiscounts as any);

export default router;
