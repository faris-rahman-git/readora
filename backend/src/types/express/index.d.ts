import { JwtPayload } from "jsonwebtoken";
import { UserPayloadType } from "../authTypes";

declare global {
  namespace Express {
    export interface Request {
      user?: UserPayloadType | JwtPayload;
    }
  }
}
