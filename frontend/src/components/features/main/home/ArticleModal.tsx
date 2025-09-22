import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, ThumbsDown, Ban } from "lucide-react";
import type { AllArticlesType } from "@/types/main/HomeTypes";
import { formatCreatedAt } from "@/utils/dateFormate";
import type { UserDataType } from "@/types/auth/LoginType";

function ArticleModal({
  selectedArticle,
  setShowArticleModal,
  handleLike,
  handleDislike,
  setBlockArticleId,
  user,
}: {
  selectedArticle: AllArticlesType;
  setShowArticleModal: (show: boolean) => void;
  handleLike: (articleId: string) => void;
  handleDislike: (articleId: string) => void;
  setBlockArticleId: React.Dispatch<React.SetStateAction<string | null>>;
  user: UserDataType;
}) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowArticleModal(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-slate-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Badge className="bg-emerald-600 text-white">
              {selectedArticle.category}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowArticleModal(false)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </Button>
          </div>

          <img
            src={selectedArticle.coverImage}
            alt={selectedArticle.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          <h1 className="text-3xl font-bold text-white mb-4">
            {selectedArticle.title}
          </h1>

          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedArticle.author.avatar} />
              <AvatarFallback className="bg-slate-800 text-slate-300">
                {(selectedArticle.author.firstName[0] || "").toUpperCase()}
                {(selectedArticle.author.lastName[0] || "").toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-slate-200">
                {`${selectedArticle.author.firstName} ${selectedArticle.author.lastName}`}
              </p>
              <p className="text-sm text-slate-400">
                {formatCreatedAt(selectedArticle.createdAt)} •{" "}
                {Math.ceil(selectedArticle.content.length / 1000)} min read
              </p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-6 text-slate-300 leading-relaxed">
            <p className="text-slate-300 leading-relaxed">
              {selectedArticle.description}
            </p>
            <ReactMarkdown>{selectedArticle.content}</ReactMarkdown>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {selectedArticle.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-slate-800 text-slate-300"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-slate-800">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(selectedArticle._id)}
                className={`p-2 ${
                  selectedArticle.likes.includes(user.id!)
                    ? "text-blue-500 hover:text-blue-500"
                    : "text-slate-400 hover:text-slate-300"
                }`}
              >
                <Heart
                  className={`h-4 w-4 ${
                    selectedArticle.likes.includes(user.id!)
                      ? "fill-current"
                      : ""
                  }`}
                />
                <span className="ml-1 text-xs">
                  {selectedArticle.likes.length} Likes
                </span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDislike(selectedArticle._id)}
                className={`p-2 ${
                  selectedArticle.disLikes.includes(user.id!)
                    ? "text-red-700 hover:text-red-700"
                    : "text-slate-400 hover:text-slate-300"
                }`}
              >
                <ThumbsDown
                  className={`h-4 w-4 ${
                    selectedArticle.disLikes.includes(user.id!)
                      ? "fill-current"
                      : ""
                  }`}
                />
                <span className="ml-1 text-xs">
                  {selectedArticle.disLikes.length}
                </span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => setBlockArticleId(selectedArticle._id)}
                className="text-slate-400 hover:text-red-400"
              >
                <Ban className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleModal;
