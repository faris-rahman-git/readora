import { uploadImageApi } from "@/services/common/mediaService";
import { useMutation } from "@tanstack/react-query";

export const useUploadImage = () => {
  return useMutation({
    mutationFn: uploadImageApi,
  });
};
