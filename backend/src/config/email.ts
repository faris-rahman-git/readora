import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendMails = async (email: string, otp: string) => {
  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject: "Readora OTP Verification",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">🔐 OTP Verification</h2>
        <p>Hello,</p>
        <p>Your OTP is:</p>
        <h1 style="background:#f4f4f4;padding:10px;display:inline-block;border-radius:5px;">
          ${otp}
        </h1>
        <p>This code will expire in <b>2 minutes</b>.</p>
        <p>If you didn’t request this, please ignore this email.</p>
        <br>
        <p>Thanks,<br>Readora Team</p>
      </div>
    `,
  };

  await sgMail.send(msg);
};
