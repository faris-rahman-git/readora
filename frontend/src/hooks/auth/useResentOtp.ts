import { resentOtpApi } from "@/services/auth/authServices";
import { useMutation } from "@tanstack/react-query";

export const useResentOtp = () => {
  return useMutation({
    mutationFn: resentOtpApi,
  });
};