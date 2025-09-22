import userModel from "../../model/userModel";
import { RegisterDataForm } from "../../types/authTypes";
import { PersonalInfoType } from "../../types/SettingsTypes";

export const createNewUser = async ({
  firstName,
  lastName,
  phone,
  email,
  dob,
  preferences,
  hashedPassword,
}: Omit<RegisterDataForm, "password" | "confirmPassword"> & {
  hashedPassword: string;
}) => {
  await userModel.create({
    firstName,
    lastName,
    phoneNumber: phone,
    email,
    DOB: dob,
    password: hashedPassword,
    preferences,
  });
};

export const verifyLogin = async (emailOrPhone: string) => {
  const res = await userModel.findOne(
    {
      $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
    },
    {
      password: 1,
      email: 1,
      firstName: 1,
      lastName: 1,
      _id: 1,
      avatar: 1,
      preferences: 1,
    }
  );
  return res;
};

export const userDetailsService = async (id: string) => {
  const res = (await userModel.findById(id, { password: 0 }))!;
  return {
    firstName: res.firstName,
    lastName: res.lastName,
    email: res.email,
    phoneNumber: res.phoneNumber,
    avatar: res.avatar,
    DOB: res.DOB,
    preferences: res.preferences,
  };
};

export const updateProfile = async (id: string, data: PersonalInfoType) => {
  await userModel.findByIdAndUpdate(id, { $set: data });
};

export const updatePreference = async (id: string, preferences: string[]) => {
  await userModel.findByIdAndUpdate(id, { $set: { preferences } });
};

export const updatePassword = async (id: string, hashPassword: string) => {
  await userModel.findByIdAndUpdate(id, { $set: { password: hashPassword } });
};
