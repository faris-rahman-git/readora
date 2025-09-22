import api from "@/configs/axios";
import type { PersonalInfoType } from "@/types/main/SettingsTypes";
const SETTINGS_API = "/settings";

export const getUserDetailsApi = async () => {
  const res = await api.get(SETTINGS_API + "/user-details");
  return res.data;
};

export const updateProfileApi = async (data: PersonalInfoType) => {
  const res = await api.put(SETTINGS_API + "/update-profile", data);
  return res.data;
};

export const updatePreferenceApi = async (data: { preferences: string[] }) => {
  const res = await api.put(SETTINGS_API + "/update-preference", data);
  return res.data;
};

export const updatePasswordApi = async (data: {
  password: string;
  confirmPassword: string;
}) => {
  const res = await api.put(SETTINGS_API + "/update-password", data);
  return res.data;
};
