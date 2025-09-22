import { getAllArticleApi } from "@/services/main/HomeService";
import { useMutation } from "@tanstack/react-query";

export const useGetAllArticle = () => {
  return useMutation({
    mutationFn: getAllArticleApi,
  });
};
