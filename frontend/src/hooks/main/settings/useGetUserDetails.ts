import { getUserDetailsApi } from "@/services/main/settingsService";
import { useMutation } from "@tanstack/react-query";

export const useGetUserDetails = () => {
  return useMutation({
    mutationFn: getUserDetailsApi,
  });
};
