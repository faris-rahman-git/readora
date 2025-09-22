import { Schema, model } from "mongoose";

const OtpSchema = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: { expires: 120 } },
});

export default model("otpModel", OtpSchema);
