import { Router } from "express";
import { authExpress } from "../../middleware/authExpress";
import {
  deleteArticleHandler,
  editArticleDetailsHandler,
  editArticleHandler,
  myArticlesHandler,
  publishArticleHandler,
} from "../../controllers/main/articleController";
export const articleRoute = Router();

articleRoute.post("/publish-article", authExpress, publishArticleHandler);

articleRoute.get("/my-article", authExpress, myArticlesHandler);

articleRoute.delete(
  "/delete-article/:articleId",
  authExpress,
  deleteArticleHandler
);

articleRoute.get(
  "/edit-article-details/:articleId",
  authExpress,
  editArticleDetailsHandler
);

articleRoute.put("/edit-article/:articleId", authExpress, editArticleHandler);

export default articleRoute;
