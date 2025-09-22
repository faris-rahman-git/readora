import type { EditOrCreateArticleType } from "./ArticleTypes";

export type AllArticlesType = Omit<
  Required<EditOrCreateArticleType>,
  "author"
> & {
  author: {
    firstName: string;
    lastName: string;
    avatar: string;
  };
  likes: string[];
  disLikes: string[];
};
