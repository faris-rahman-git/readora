import { registerApi } from "@/services/auth/authServices";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerApi,
  });
};
