import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/features/main/home/Header";
import EmptyArticle from "@/components/features/main/MyArticle/EmptyArticle";
import ArticleCard from "@/components/features/main/MyArticle/ArticleCard";
import { useGetMyArticles } from "@/hooks/main/article/useGetMyArticles";
import { showLoader, hideLoader } from "@/redux/features/common/LoaderSlice";
import { useDispatch } from "react-redux";
import type { MyArticleType } from "@/types/main/ArticleTypes";
import { useDeleteArticle } from "@/hooks/main/article/useDeleteArticle";

export default function MyArticle() {
  const dispatch = useDispatch();

  const [articles, setArticles] = useState<MyArticleType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteArticleId, setDeleteArticleId] = useState<string | null>(null);

  const { isPending, isSuccess, mutate, data } = useGetMyArticles();
  const { mutate: mutateDelete, isPending: isPendingDelete } =
    useDeleteArticle();

  const handleDeleteArticle = (articleId: string) => {
    mutateDelete(articleId);
    setArticles((prev) => prev.filter((article) => article._id !== articleId));
    setDeleteArticleId(null);
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  useEffect(() => {
    mutate();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setArticles(data.myArticles);
    }
  }, [isSuccess]);

  useEffect(() => {
    const pending = isPending || isPendingDelete;
    dispatch(pending ? showLoader() : hideLoader());
  }, [isPending, isPendingDelete]);

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                My Articles
              </h1>
              <p className="text-slate-400">
                Manage and track your published content
              </p>
            </div>
            <Link to="/create-article">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create New Article
              </Button>
            </Link>
          </div>

          {/* Search */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search your articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-900 border-slate-800 text-white focus:border-emerald-500"
              />
            </div>
          </div>

          {filteredArticles.length === 0 ? (
            <EmptyArticle searchQuery={searchQuery} />
          ) : (
            <ArticleCard
              filteredArticles={filteredArticles}
              setDeleteArticleId={setDeleteArticleId}
            />
          )}
        </div>
      </main>

      <AlertDialog
        open={deleteArticleId !== null}
        onOpenChange={() => setDeleteArticleId(null)}
      >
        <AlertDialogContent className="bg-slate-900 border-slate-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Delete Article
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete this article? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                console.log("deleteArticleId", deleteArticleId);
                deleteArticleId && handleDeleteArticle(deleteArticleId);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Article
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
