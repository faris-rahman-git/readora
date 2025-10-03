import { Request, Response, NextFunction } from "express";
import { verifyRegisterToken } from "../service/auth/tokenService";

export const authRegisterMail = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const registerToken = req.cookies.registerToken;
  let email = req.body.email;
  if (!email) {
    email = req.user?.email;
  }

  if (!registerToken) {
    res.status(401).json({ message: "Register token missing" });
    return;
  }

  const { valid, decoded } = verifyRegisterToken(registerToken);

  if (!valid || !decoded || email !== decoded.email) {
    res.status(403).json({ message: "Invalid Register token" });
    return;
  }

  req.user = decoded;
  next();
};
