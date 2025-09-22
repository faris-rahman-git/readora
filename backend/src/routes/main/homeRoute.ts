import { Router } from "express";
import { authExpress } from "../../middleware/authExpress";
import {
  allArticlesHandler,
  blockArticlesHandler,
  dislikeArticlesHandler,
  likeArticlesHandler,
} from "../../controllers/main/homeController";
export const homeRoute = Router();

homeRoute.get("/all-article", authExpress, allArticlesHandler);

homeRoute.patch("/block-article/:articleId", authExpress, blockArticlesHandler);

homeRoute.patch("/like-article/:articleId", authExpress, likeArticlesHandler);

homeRoute.patch("/dislike-article/:articleId", authExpress, dislikeArticlesHandler);

export default homeRoute;
