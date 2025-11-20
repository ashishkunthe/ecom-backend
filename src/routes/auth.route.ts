import { Router } from "express";
import {
  AdminLogin,
  AdminRegister,
  LoginController,
  RegisterController,
} from "../controller/auth.controller";

const route = Router();

route.post("/user-register", RegisterController);
route.post("/user-login", LoginController);
route.post("/admin-register", AdminRegister);
route.post("/admin-login", AdminLogin);

export default route;
