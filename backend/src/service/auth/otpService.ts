import { transporter } from "../../config/email";
import otpModel from "../../model/otpModel";

export const sendOtpEmail = async (
  email: string,
  otp: string
): Promise<void> => {
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Readora OTP Verification",
    text: `Your OTP is ${otp}. It will expire in 2 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

export const saveOtp = async (email: string, otp: string): Promise<void> => {
  await otpModel.findOneAndUpdate(
    { email },
    { email, otp },
    { upsert: true, new: true }
  );
};

export const isOtpValid = async (email: string, otp: string): Promise<boolean> => {
  const res = await otpModel.findOne({ email, otp });
  if (res) return true;
  return false;
};