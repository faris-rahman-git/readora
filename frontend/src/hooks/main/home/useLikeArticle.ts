import { likeArticleApi } from "@/services/main/HomeService";
import { useMutation } from "@tanstack/react-query";

export const useLikeArticle = () => {
  return useMutation({
    mutationFn: likeArticleApi,
  });
};
