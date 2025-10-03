import { NextFunction, Request, Response } from "express";
import { UserPayloadType } from "../../types/authTypes";
import {
  blockArticle,
  getAllArticles,
  toggleDislikeArticle,
  toggleLikeArticle,
} from "../../service/main/article/articleService";
import { getUserPreferences } from "../../service/common/userService";

export const allArticlesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as UserPayloadType;
    const { selectedCategory, searchQuery, lastId } = req.query;
    let preferences: string[] = [];
    if (selectedCategory === "Recommended") {
      preferences = await getUserPreferences(id);
    }
    const { articles, nextToken } = await getAllArticles(
      id,
      selectedCategory as string,
      searchQuery as string,
      preferences,
      lastId as string | undefined,
    );
    return res.status(200).json({ articles, nextToken });
  } catch (err) {
    next(err);
  }
};

export const blockArticlesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as UserPayloadType;
    const { articleId } = req.params;
    await blockArticle(articleId, id);
    return res.status(200).json({});
  } catch (err) {
    next(err);
  }
};

export const likeArticlesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as UserPayloadType;
    const { articleId } = req.params;
    await toggleLikeArticle(articleId, id);
    return res.status(200).json({});
  } catch (err) {
    next(err);
  }
};

export const dislikeArticlesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as UserPayloadType;
    const { articleId } = req.params;
    await toggleDislikeArticle(articleId, id);
    return res.status(200).json({});
  } catch (err) {
    next(err);
  }
};
