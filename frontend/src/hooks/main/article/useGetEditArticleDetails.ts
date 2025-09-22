import { getEditArticleDetailsApi } from "@/services/main/ArticleService";
import { useMutation } from "@tanstack/react-query";

export const useGetEditArticleDetails = () => {
  return useMutation({
    mutationFn: getEditArticleDetailsApi,
  });
};
