export type RegisterDataForm = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dob: string;
  preferences: string[];
  password: string;
  confirmPassword: string;
};

export type UserPayloadType = {
  id: string;
  email: string;
};
