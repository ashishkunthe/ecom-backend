import { Router } from "express";
import {
  AdminLogin,
  AdminRegister,
  LoginController,
  RegisterController,
} from "../controller/auth.controller";
import { adminAuthMiddleware } from "../middlewares/authMiddleware";

const route = Router();

route.post("/user-register", RegisterController);
route.post("/user-login", LoginController);
route.post("/admin-register", adminAuthMiddleware, AdminRegister);
route.post("/admin-login", adminAuthMiddleware, AdminLogin);

export default route;
