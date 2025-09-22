import { passwordAndSaveApi } from "@/services/auth/authServices";
import { useMutation } from "@tanstack/react-query";

export const usePasswordAndSave = () => {
  return useMutation({
    mutationFn: passwordAndSaveApi,
  });
};
