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
