import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Heart,
  ThumbsDown,
  Ban,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { MyArticleType } from "@/types/main/ArticleTypes";

function ArticleCard({
  filteredArticles,
  setDeleteArticleId,
}: {
  filteredArticles: MyArticleType[];
  setDeleteArticleId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  return (
    <div className="grid gap-6">
      {filteredArticles.map((article) => (
        <Card
          key={article._id}
          className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors"
        >
          <CardContent className="p-6">
            <div className="flex gap-6">
              {/* Article Image */}
              <div className="flex-shrink-0">
                <img
                  src={article.coverImage || "/placeholder.svg"}
                  alt={article.title}
                  className="w-32 h-24 object-cover rounded-lg"
                />
              </div>

              {/* Article Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-white line-clamp-1">
                      {article.title}
                    </h3>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-white"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-slate-800 border-slate-700"
                    >
                      <Link to={`/edit-article/${article._id}`}>
                        <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Article
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator className="bg-slate-700" />
                      <DropdownMenuItem
                        onClick={() => setDeleteArticleId(article._id)}
                        className="text-red-400 hover:text-red-300 hover:bg-slate-700"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Article
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                  {article.description}
                </p>

                {/* Article Meta */}
                <div className="flex items-center gap-4 mb-3">
                  <Badge className="bg-emerald-600 hover:bg-emerald-700">
                    {article.category}
                  </Badge>
                  <span className="text-slate-500 text-sm">
                    {`Published on ${new Date(
                      article.createdAt
                    ).toLocaleDateString()}`}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs border-slate-700 text-slate-400"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {article.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsDown className="h-4 w-4" />
                    {article.disLikes}
                  </div>
                  {article.blockedUsers > 0 && (
                    <div className="flex items-center gap-1 text-red-400">
                      <Ban className="h-4 w-4" />
                      {article.blockedUsers} blocked
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ArticleCard;
