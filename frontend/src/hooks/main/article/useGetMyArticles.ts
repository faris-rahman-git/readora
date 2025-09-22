import { getMyArticlesApi } from "@/services/main/ArticleService";
import { useMutation } from "@tanstack/react-query";

export const useGetMyArticles = () => {
  return useMutation({
    mutationFn: getMyArticlesApi,
  });
};
