import { updatePasswordApi } from "@/services/main/settingsService";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: updatePasswordApi,
  });
};
