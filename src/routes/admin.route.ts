import { Router } from "express";
import { adminAuthMiddleware } from "../middlewares/authMiddleware";
import { getAdminStats } from "../controller/stats.controller";

const router = Router();

router.get("/stats", adminAuthMiddleware, getAdminStats);

export default router;
