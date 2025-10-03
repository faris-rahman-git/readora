import mongoose from "mongoose";
import articleModel from "../../../model/articleModel";
import {
  CreateArticleType,
  EditArticleType,
} from "../../../types/ArticleTypes";
import { AuthorType } from "../../../types/HomeType";

export const saveNewArticle = async (data: CreateArticleType) => {
  await articleModel.create(data);
};

export const getMyArticles = async (id: string) => {
  const res = await articleModel.find({ author: id });

  return res.map((item) => ({
    _id: item._id.toString(),
    title: item.title,
    description: item.description,
    category: item.category,
    tags: item.tags,
    coverImage: item.coverImage,
    content: item.content,
    author: item.author.toString(),
    likes: item.likes ? item.likes.length : 0,
    disLikes: item.disLikes ? item.disLikes.length : 0,
    blockedUsers: item.blockedUsers ? item.blockedUsers.length : 0,
    createdAt: item.createdAt,
  }));
};

export const deleteArticle = async (articleId: string) => {
  await articleModel.findByIdAndDelete(articleId);
};

export const getEditArticleDetails = async (articleId: string) => {
  const res = await articleModel.findById(articleId)!;
  return {
    _id: res?._id.toString(),
    title: res?.title,
    description: res?.description,
    category: res?.category,
    tags: res?.tags,
    coverImage: res?.coverImage,
    content: res?.content,
    author: res?.author.toString(),
    createdAt: res?.createdAt,
  };
};

export const updateArticle = async (
  userId: string,
  articleId: string,
  data: EditArticleType
) => {
  await articleModel.findOneAndUpdate(
    { _id: articleId, author: userId },
    {
      $set: {
        title: data.title,
        description: data.description,
        category: data.category,
        tags: data.tags,
        coverImage: data.coverImage,
        content: data.content,
      },
    }
  );
};

export const getAllArticles = async (
  userId: string,
  selectedCategory: string,
  searchQuery: string,
  preferences: string[],
  lastId?: string,
  limit = 6
) => {
  let category: any = {};
  if (selectedCategory === "All") category = { $ne: "" };
  else if (selectedCategory === "Recommended") category = preferences;
  else category = selectedCategory;

  const query: any = {
    author: { $ne: userId },
    blockedUsers: { $ne: userId },
    category,
    $or: [
      { title: { $regex: searchQuery, $options: "i" } },
      { description: { $regex: searchQuery, $options: "i" } },
    ],
  };

  if (lastId) query._id = { $gt: lastId };

  const res = await articleModel
    .find(query)
    .sort({ _id: 1 })
    .limit(limit)
    .populate("author", "firstName lastName avatar");

  const articles = res.map((item) => {
    const author = item.author as unknown as AuthorType;
    return {
      _id: item._id.toString(),
      title: item.title,
      description: item.description,
      category: item.category,
      tags: item.tags,
      coverImage: item.coverImage,
      content: item.content,
      author: {
        firstName: author.firstName,
        lastName: author.lastName,
        avatar: author.avatar,
      },
      likes: item.likes.map((item) => item.toString()),
      disLikes: item.disLikes.map((item) => item.toString()),
      createdAt: item.createdAt,
    };
  });

  const nextToken =
    articles.length === limit ? articles[articles.length - 1]._id : null;

  return { articles, nextToken };
};

export const blockArticle = async (articleId: string, userId: string) => {
  await articleModel.findOneAndUpdate(
    { _id: articleId },
    { $addToSet: { blockedUsers: userId } }
  );
};

export const toggleLikeArticle = async (articleId: string, userId: string) => {
  const objectId = new mongoose.Types.ObjectId(userId);

  const article = await articleModel.findById(articleId);

  if (!article) return;

  const hasLiked = article.likes.includes(objectId);

  if (hasLiked) {
    await articleModel.findByIdAndUpdate(articleId, {
      $pull: { likes: objectId },
    });
  } else {
    await articleModel.findByIdAndUpdate(articleId, {
      $addToSet: { likes: objectId },
      $pull: { disLikes: objectId },
    });
  }
};

export const toggleDislikeArticle = async (
  articleId: string,
  userId: string
) => {
  const objectId = new mongoose.Types.ObjectId(userId);

  const article = await articleModel.findById(articleId);

  if (!article) return;

  const hasDisliked = article.disLikes.includes(objectId);

  if (hasDisliked) {
    await articleModel.findByIdAndUpdate(articleId, {
      $pull: { disLikes: objectId },
    });
  } else {
    await articleModel.findByIdAndUpdate(articleId, {
      $addToSet: { disLikes: objectId },
      $pull: { likes: objectId },
    });
  }
};
