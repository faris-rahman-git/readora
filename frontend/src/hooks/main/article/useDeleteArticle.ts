import { deleteArticleApi } from "@/services/main/ArticleService";
import { useMutation } from "@tanstack/react-query";

export const useDeleteArticle = () => {
  return useMutation({
    mutationFn: deleteArticleApi,
  });
};
