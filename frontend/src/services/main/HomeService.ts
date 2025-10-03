import api from "@/configs/axios";
const HOME_API = "/home";

export const getAllArticleApi = async ({
  selectedCategory,
  searchQuery,
  lastId,
}: {
  selectedCategory: string;
  searchQuery: string;
  lastId: string | null;
}) => {
  console.log(selectedCategory);
  const res = await api.get(HOME_API + "/all-article", {
    params: { selectedCategory, searchQuery, lastId },
  });
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
