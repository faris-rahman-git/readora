export type CreateArticleType = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  coverImage: string;
  content: string;
  author: string;
};

export type CreateOrEditErrorType = {
  title: string;
  description: string;
  category: string;
  tags: string;
  coverImage: string;
  content: string;
};

export type EditArticleType = Omit<CreateArticleType, "author">;
