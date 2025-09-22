import api from "@/configs/axios";
import type { RegisterDataForm } from "@/types/auth/RegisterType";
const AUTH_API = "/auth";

export const registerApi = async (data: { email: string; phone: string }) => {
  const res = await api.post(AUTH_API + "/register", data);
  return res.data;
};

export const otpApi = async (data: { otp: string; email: string }) => {
  const res = await api.post(AUTH_API + "/otp", data);
  return res.data;
};

export const resentOtpApi = async (data: { email: string , isRegister: boolean }) => {
  const res = await api.post(AUTH_API + "/resentotp", data);
  return res.data;
};

export const passwordAndSaveApi = async (data: RegisterDataForm) => {
  const res = await api.post(AUTH_API + "/passwordandsave", data);
  return res.data;
};

export const loginApi = async (data: {
  emailOrPhone: string;
  password: string;
}) => {
  const res = await api.post(AUTH_API + "/login", data);
  return res.data;
};

export const logoutApi = async () => {
  const res = await api.get(AUTH_API + "/logout");
  return res.data;
};
