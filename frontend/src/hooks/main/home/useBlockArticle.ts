import { blockArticleApi } from "@/services/main/HomeService";
import { useMutation } from "@tanstack/react-query";

export const useBlockArticle = () => {
  return useMutation({
    mutationFn: blockArticleApi,
  });
};
