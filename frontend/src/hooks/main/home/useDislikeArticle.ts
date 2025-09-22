import { dislikeArticleApi } from "@/services/main/HomeService";
import { useMutation } from "@tanstack/react-query";

export const useDislikeArticle = () => {
  return useMutation({
    mutationFn: dislikeArticleApi,
  });
};
