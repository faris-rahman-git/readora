import { RegisterDataForm } from "../../types/authTypes";
import { validateEmail } from "./validateEmail";
import { validatePhone } from "./validatePhone";

export const validateFormData = (formData: RegisterDataForm) => {
  const isRegistrationValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    validateEmail(formData.email) &&
    validatePhone(formData.phone) &&
    formData.dob !== "" &&
    formData.preferences.length > 0;

  return isRegistrationValid;
};

export const validateDOB = (dob: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dob)) return false;

  const [year, month, day] = dob.split("-").map(Number);
  const dateObj = new Date(dob);

  if (
    dateObj.getFullYear() !== year ||
    dateObj.getMonth() + 1 !== month ||
    dateObj.getDate() !== day
  ) {
    return false;
  }

  const today = new Date();
  let age = today.getFullYear() - year;
  const m = today.getMonth() - (month - 1);
  if (m < 0 || (m === 0 && today.getDate() < day)) {
    age--;
  }

  return age >= 10;
};
