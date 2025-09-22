import jwt from "jsonwebtoken";
import { UserPayloadType } from "../../types/authTypes";

export const createAccessToken = (payload: UserPayloadType): string => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (payload: UserPayloadType): string => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token: string) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!
    ) as jwt.JwtPayload;

    if (!decoded || typeof decoded !== "object") {
      return { valid: false, decoded: null };
    }

    const { id, email } = decoded as UserPayloadType;

    return { valid: true, decoded: { id, email } };
  } catch (err) {
    return { valid: false, decoded: null };
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET!
    ) as jwt.JwtPayload;

    if (!decoded || typeof decoded !== "object") {
      return { valid: false, decoded: null };
    }

    const { id, email } = decoded as UserPayloadType;

    return { valid: true, decoded: { id, email } };
  } catch (err) {
    return { valid: false, decoded: null };
  }
};
