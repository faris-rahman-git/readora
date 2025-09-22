import { updateProfileApi } from "@/services/main/settingsService";
import { useMutation } from "@tanstack/react-query";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfileApi,
  });
};
