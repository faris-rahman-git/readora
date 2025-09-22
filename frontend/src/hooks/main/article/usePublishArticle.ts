import { publishArticleApi } from "@/services/main/ArticleService";
import { useMutation } from "@tanstack/react-query";

export const usePublishArticle = () => {
  return useMutation({
    mutationFn: publishArticleApi,
  });
};
