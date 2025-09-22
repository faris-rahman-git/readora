import { loginApi } from "@/services/auth/authServices";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
  });
};
