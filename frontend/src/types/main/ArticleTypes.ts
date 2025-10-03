export type EditOrCreateArticleType = {
  _id?: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  coverImage: string;
  content: string;
  createdAt?: Date;
  author?: string;
};

export type EditOrCreateArticleErrorType = Omit<
  EditOrCreateArticleType,
  "_id" | "createdAt" | "tags"
> & { tags: string };

export type MyArticleType = Required<EditOrCreateArticleType> & {
  likes: number;
  disLikes: number;
  blockedUsers: number;
};
