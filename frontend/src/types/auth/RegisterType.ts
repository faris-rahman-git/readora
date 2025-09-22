export type ValidationErrorsType = {
  email: string;
  phone: string;
};

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

export type passwordChecksType = {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
}