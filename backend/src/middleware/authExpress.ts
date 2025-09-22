import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../service/auth/tokenService";

export const authExpress = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    res.status(401).json({ message: "Access token missing" });
    return;
  }

  const { valid, decoded } = verifyAccessToken(accessToken);

  if (!valid || !decoded) {
    res.status(403).json({ message: "Invalid access token" });
    return;
  }

  req.user = decoded;
  next();
};
