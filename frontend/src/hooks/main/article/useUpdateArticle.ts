import { updateArticleApi } from "@/services/main/ArticleService";
import { useMutation } from "@tanstack/react-query";

export const useUpdateArticle = () => {
  return useMutation({
    mutationFn: updateArticleApi,
  });
};
