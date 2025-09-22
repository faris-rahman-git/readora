import bcrypt from "bcrypt";
const SaltRounds = 10;

export const generatePassword = async (
  plainPassword: string
): Promise<string> => {
  return await bcrypt.hash(plainPassword, SaltRounds);
};

export const validatePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
