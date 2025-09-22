export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string) => {
  const phoneDigits = phone.replace(/\D/g, "");
  return phoneDigits.length === 10 && /^[6-9]/.test(phoneDigits);
};
