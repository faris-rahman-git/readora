import { NextFunction, Request, Response } from "express";
import {
  deleteArticle,
  getEditArticleDetails,
  getMyArticles,
  saveNewArticle,
  updateArticle,
} from "../../service/main/article/articleService";
import { UserPayloadType } from "../../types/authTypes";

export const publishArticleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await saveNewArticle(req.body);
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
    const { articleId } = req.params;
    await updateArticle(id, articleId, req.body);
    return res.status(200).json({});
  } catch (err) {
    next(err);
  }
};
