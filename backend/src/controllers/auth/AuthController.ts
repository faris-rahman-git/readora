import { NextFunction, Request, Response } from "express";
import { validateEmail } from "../../utils/auth/validateEmail";
import { validatePhone } from "../../utils/auth/validatePhone";
import {
  isEmailTaken,
  isPhoneTaken,
} from "../../service/auth/verifyUserDetails";
import { generateOTP } from "../../utils/auth/otpGenerator";
import {
  isOtpValid,
  saveOtp,
  sendOtpEmail,
} from "../../service/auth/otpService";
import {
  validateDOB,
  validateFormData,
} from "../../utils/auth/validateFormData";
import {
  generatePassword,
  validatePassword,
} from "../../service/auth/PasswordService";
import { createNewUser, verifyLogin } from "../../service/common/userService";
import {
  createAccessToken,
  createRefreshToken,
  createRegisterToken,
  verifyRefreshToken,
} from "../../service/auth/tokenService";

export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, phone, dob } = req.body;
    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ message: { email: "Please enter a valid email address" } });
    }
    if (!validatePhone(phone)) {
      return res.status(400).json({
        message: { phone: "Please enter a valid 10-digit phone number" },
      });
    }
    if (!validateDOB(dob)) {
      return res.status(400).json({
        message: { dob: "Please enter a valid date of birth" },
      });
    }
    const emailExist = await isEmailTaken(email);
    if (emailExist) {
      return res
        .status(400)
        .json({ message: { email: "Email Id is already taken" } });
    }
    const phoneExist = await isPhoneTaken(phone);
    if (phoneExist) {
      return res
        .status(400)
        .json({ message: { phone: "Phone number is already taken" } });
    }
    const otp = generateOTP();
    await sendOtpEmail(email, otp);
    await saveOtp(email, otp);
    console.log("registerHandler", otp);
    return res.status(200).json({});
  } catch (err) {
    next(err);
  }
};

export const resentOtpHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, isRegister } = req.body;
    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ message: { email: "Please enter a valid email address" } });
    }
    if (isRegister) {
      const emailExist = await isEmailTaken(email);
      if (emailExist) {
        return res
          .status(400)
          .json({ message: { email: "Email Id is already taken" } });
      }
    }
    const otp = generateOTP();
    await sendOtpEmail(email, otp);
    await saveOtp(email, otp);
    return res.status(200).json({});
  } catch (err) {
    next(err);
  }
};

export const otpHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { otp, email } = req.body;
    const isValid = await isOtpValid(email, otp);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const payload = { email };
    const registerToken = createRegisterToken(payload);

    res.cookie("registerToken", registerToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 60 * 1000,
    });
    res.status(200).json({});
  } catch (err) {
    next(err);
  }
};

export const passwordAndSaveHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      dob,
      preferences,
      password,
      confirmPassword,
    } = req.body;

    const isValidForm = validateFormData(req.body);
    if (!isValidForm || !validateDOB(dob) || !validatePhone(phone)) {
      return res.status(400).json({ message: "Invalid form data" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const hashedPassword = await generatePassword(password);
    await createNewUser({
      firstName,
      lastName,
      phone,
      email,
      dob,
      preferences,
      hashedPassword,
    });
    res.clearCookie("registerToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({});
  } catch (err) {
    next(err);
  }
};

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { emailOrPhone, password } = req.body;

    const userDetails = await verifyLogin(emailOrPhone);
    if (!userDetails) {
      return res
        .status(400)
        .json({ message: "Invalid email, phone number or password" });
    }

    const isValidPassword = await validatePassword(
      password,
      userDetails.password
    );
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ message: "Invalid email, phone number or password" });
    }

    const payload = { email: userDetails.email, id: String(userDetails._id) };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      id: String(userDetails._id),
      email: userDetails.email,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      avatar: userDetails.avatar,
      preferences: userDetails.preferences,
    });
  } catch (err) {
    next(err);
  }
};

export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({});
  } catch (err) {
    next(err);
  }
};

export const refreshHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "Invalid refresh token" });

    const { valid, decoded } = verifyRefreshToken(refreshToken);

    if (!valid || !decoded) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const payload = {
      email: decoded.email,
      id: decoded.id,
    };

    const newAccessToken = createAccessToken(payload);
    const newRefreshToken = createRefreshToken(payload);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({});
  } catch (err) {
    next(err);
  }
};
