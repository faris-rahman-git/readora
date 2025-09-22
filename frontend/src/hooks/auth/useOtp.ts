import { otpApi } from "@/services/auth/authServices";
import { useMutation } from "@tanstack/react-query";

export const useOtp = () => {
  return useMutation({
    mutationFn: otpApi,
  });
};
