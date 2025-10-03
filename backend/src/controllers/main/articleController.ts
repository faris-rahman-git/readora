import { NextFunction, Request, Response } from "express";
import {
  deleteArticle,
  getEditArticleDetails,
  getMyArticles,
  saveNewArticle,
  updateArticle,
} from "../../service/main/article/articleService";
import { UserPayloadType } from "../../types/authTypes";
import { validateArticleField } from "../../utils/main/validateArticleField";

export const publishArticleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id!;
    const data = req.body;
    const check = await validateArticleField(data);
    if (check.isError) {
      return res.status(400).json({ message: check.errors });
    }
    await saveNewArticle({ ...data, author: userId });
    return res.status(200).json({});
  } catch (err) {
    next(err);
  }
};

export const myArticlesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as UserPayloadType;
    const myArticles = await getMyArticles(id);
    return res.status(200).json({ myArticles });
  } catch (err) {
    next(err);
  }
};

export const deleteArticleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { articleId } = req.params;
    await deleteArticle(articleId);
    return res.status(200).json({});
  } catch (err) {
    next(err);
  }
};

export const editArticleDetailsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { articleId } = req.params;
    const articleDetails = await getEditArticleDetails(articleId);
    return res.status(200).json({ articleDetails });
  } catch (err) {
    next(err);
  }
};

export const editArticleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as UserPayloadType;
    const data = req.body;
    const { articleId } = req.params;
    const check = await validateArticleField(data);
    if (check.isError) {
      return res.status(400).json({ message: check.errors });
    }
    await updateArticle(id, articleId, data);
    return res.status(200).json({});
  } catch (err) {
    next(err);
  }
};
