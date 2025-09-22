import { Router } from "express";
import {
  loginHandler,
  logoutHandler,
  otpHandler,
  passwordAndSaveHandler,
  refreshHandler,
  registerHandler,
  resentOtpHandler,
} from "../../controllers/auth/AuthController";
export const authRoute = Router();

authRoute.post("/register", registerHandler);

authRoute.post("/otp", otpHandler);

authRoute.post("/resentotp", resentOtpHandler);

authRoute.post("/passwordandsave", passwordAndSaveHandler);

authRoute.post("/login", loginHandler);

authRoute.get("/logout", logoutHandler);

authRoute.get("/refresh", refreshHandler);

export default authRoute;
