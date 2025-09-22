import { updatePreferenceApi } from "@/services/main/settingsService";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePreference = () => {
  return useMutation({
    mutationFn: updatePreferenceApi,
  });
};
