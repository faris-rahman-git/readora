export type EditOrCreateArticleType = {
  _id?: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  coverImage: string;
  content: string;
  author?: string;
  createdAt?: Date;
};

export type EditOrCreateArticleErrorType = Omit<
  EditOrCreateArticleType,
  "_id" | "createdAt" | "author" | "tags"
> & { tags: string };

export type MyArticleType = Required<EditOrCreateArticleType> & {
  likes: number;
  disLikes: number;
  blockedUsers: number;
};


