import api from "@/configs/axios";
const HOME_API = "/home";

export const getAllArticleApi = async () => {
  const res = await api.get(HOME_API + "/all-article");
  return res.data;
};

export const blockArticleApi = async (articleId: string) => {
  const res = await api.patch(HOME_API + "/block-article/" + articleId);
  return res.data;
};

export const likeArticleApi = async (articleId: string) => {
  const res = await api.patch(HOME_API + "/like-article/" + articleId);
  return res.data;
};

export const dislikeArticleApi = async (articleId: string) => {
  const res = await api.patch(HOME_API + "/dislike-article/" + articleId);
  return res.data;
};
