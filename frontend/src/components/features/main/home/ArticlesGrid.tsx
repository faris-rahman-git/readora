import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Ban, Heart, ThumbsDown } from "lucide-react";
import no_Image from "@/assets/no_Image.jpg";
import type { AllArticlesType } from "@/types/main/HomeTypes";
import { formatCreatedAt } from "@/utils/dateFormate";
import type { UserDataType } from "@/types/auth/LoginType";

function ArticlesGrid({
  articles,
  openArticle,
  handleLike,
  handleDislike,
  setBlockArticleId,
  user,
}: {
  articles: AllArticlesType[];
  openArticle: (article: AllArticlesType) => void;
  handleLike: (articleId: string) => void;
  handleDislike: (articleId: string) => void;
  setBlockArticleId: React.Dispatch<React.SetStateAction<string | null>>;
  user: UserDataType;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.length > 0 ? (
        articles.map((article) => (
          <Card
            key={article._id}
            className="bg-slate-900 border-slate-800 hover:border-slate-700 p-0 transition-colors"
          >
            <CardHeader
              className="p-0 cursor-pointer"
              onClick={() => openArticle(article)}
            >
              <div className="relative">
                <img
                  src={article.coverImage || no_Image}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-3 left-3 bg-emerald-600/90 text-white">
                  {article.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <div
                className="cursor-pointer "
                onClick={() => openArticle(article)}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={article.author.avatar} />
                    <AvatarFallback className="bg-slate-800 text-slate-300">
                      {(article.author.firstName[0] || "").toUpperCase()}
                      {(article.author.lastName[0] || "").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-200 truncate">
                      {`${article.author.firstName} ${article.author.lastName}`}
                    </p>
                    <p className="text-xs text-slate-400">
                      {formatCreatedAt(article.createdAt)} •{" "}
                      {Math.ceil(article.content.length / 1000)} min read
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                  {article.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-slate-800 text-slate-300 hover:bg-slate-700"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(article._id)}
                    className={`p-2 ${
                      article.likes.includes(user.id!)
                        ? "text-blue-500 hover:text-blue-500"
                        : "text-slate-400 hover:text-slate-300"
                    }`}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        article.likes.includes(user.id!) ? "fill-current" : ""
                      }`}
                    />
                    <span className="ml-1 text-xs">{article.likes.length}</span>
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDislike(article._id)}
                    className={`p-2 ${
                      article.disLikes.includes(user.id!)
                        ? "text-red-700 hover:text-red-700"
                        : "text-slate-400 hover:text-slate-300"
                    }`}
                  >
                    <ThumbsDown
                      className={`h-4 w-4 ${
                        article.disLikes.includes(user.id!)
                          ? "fill-current"
                          : ""
                      }`}
                    />
                    <span className="ml-1 text-xs">
                      {article.disLikes.length}
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setBlockArticleId(article._id)}
                    className="p-2 text-slate-400 hover:text-red-400"
                  >
                    <Ban className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-full w-full text-center py-12 bg-slate-900 rounded-lg">
          <p className="text-slate-400 text-lg">
            No articles found matching your criteria.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Try adjusting your search or category filter.
          </p>
        </div>
      )}
    </div>
  );
}

export default ArticlesGrid;
