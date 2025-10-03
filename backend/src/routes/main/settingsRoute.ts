import { Router } from "express";
import {
  updatePasswordHandler,
  updatePreferenceHandler,
  updateProfileHandler,
  userDetailsHandler,
} from "../../controllers/main/settingsController";
import { authExpress } from "../../middleware/authExpress";
import { authRegisterMail } from "../../middleware/authRegisterMail";
export const settingsRoute = Router();

settingsRoute.get("/user-details", authExpress, userDetailsHandler);

settingsRoute.put("/update-profile", authExpress, updateProfileHandler);

settingsRoute.put("/update-preference", authExpress, updatePreferenceHandler);

settingsRoute.put(
  "/update-password",
  authExpress,
  authRegisterMail,
  updatePasswordHandler
);

export default settingsRoute;
