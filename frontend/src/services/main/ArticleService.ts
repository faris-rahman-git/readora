import api from "@/configs/axios";
import type { EditOrCreateArticleType } from "@/types/main/ArticleTypes";
const ARTICLE_API = "/article";

export const publishArticleApi = async (data: EditOrCreateArticleType) => {
  const res = await api.post(ARTICLE_API + "/publish-article", data);
  return res.data;
};

export const getMyArticlesApi = async () => {
  const res = await api.get(ARTICLE_API + "/my-article");
  return res.data;
};

export const deleteArticleApi = async (articleId: string) => {
  const res = await api.delete(ARTICLE_API + "/delete-article/" + articleId);
  return res.data;
};

export const getEditArticleDetailsApi = async (articleId: string) => {
  const res = await api.get(ARTICLE_API + "/edit-article-details/" + articleId);
  return res.data;
};

export const updateArticleApi = async ({
  articleId,
  data,
}: {
  articleId: string;
  data: Omit<EditOrCreateArticleType, "_id" | "createdAt" | "author">;
}) => {
  const res = await api.put(ARTICLE_API + "/edit-article/" + articleId, data);
  return res.data;
};
