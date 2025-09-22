import userModel from "../../model/userModel";

export const isEmailTaken = async (email: string): Promise<boolean> => {
  const res = await userModel.findOne({ email });
  if (res) return true;
  return false;
};

export const isPhoneTaken = async (phone: string) => {
  const res = await userModel.findOne({ phoneNumber: phone }, { _id: 1 });
  return res;
};
