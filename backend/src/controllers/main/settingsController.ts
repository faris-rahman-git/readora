import { NextFunction, Request, Response } from "express";
import { UserPayloadType } from "../../types/authTypes";
import {
  updatePassword,
  updatePreference,
  updateProfile,
  userDetailsService,
} from "../../service/common/userService";
import { validatePhone } from "../../utils/auth/validatePhone";
import { isPhoneTaken } from "../../service/auth/verifyUserDetails";
import { generatePassword } from "../../service/auth/PasswordService";

export const userDetailsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as UserPayloadType;
    const userDetails = await userDetailsService(id);
    return res.status(200).json({ userDetails });
  } catch (err) {
    next(err);
  }
};

export const updateProfileHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as UserPayloadType;
    const { phoneNumber } = req.body;
    if (!validatePhone(phoneNumber)) {
      return res.status(400).json({
        message: {
          phoneNumber: "Please enter a valid 10-digit phone number",
        },
      });
    }
    const phoneExist = await isPhoneTaken(phoneNumber);
    if (phoneExist && phoneExist._id.toString() !== id) {
      return res
        .status(400)
        .json({ message: { phoneNumber: "Phone number is already taken" } });
    }
    await updateProfile(id, req.body);
    return res.status(200).json({});
  } catch (err) {
    next(err);
  }
};

export const updatePreferenceHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as UserPayloadType;
    const { preferences } = req.body;
    await updatePreference(id, preferences);
    return res.status(200).json({});
  } catch (err) {
    next(err);
  }
};

export const updatePasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as UserPayloadType;
    const { confirmPassword, password } = req.body;

    

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const hashedPassword = await generatePassword(password);
    await updatePassword(id, hashedPassword);
    return res.status(200).json({});
  } catch (err) {
    next(err);
  }
};
