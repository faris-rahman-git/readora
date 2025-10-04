import { useEffect, useState } from "react";
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
import Header from "@/components/features/main/home/Header";
import FilterCategory from "@/components/features/main/home/FilterCategory";
import ArticlesGrid from "@/components/features/main/home/ArticlesGrid";
import ArticleModal from "@/components/features/main/home/ArticleModal";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useGetAllArticle } from "@/hooks/main/home/useGetAllArticle";
import { hideLoader, showLoader } from "@/redux/features/common/LoaderSlice";
import type { AllArticlesType } from "@/types/main/HomeTypes";
import { useBlockArticle } from "@/hooks/main/home/useBlockArticle";
import { useLikeArticle } from "@/hooks/main/home/useLikeArticle";
import { useDislikeArticle } from "@/hooks/main/home/useDislikeArticle";

export default function Home() {
  const dispatch = useDispatch();

  const [articles, setArticles] = useState<AllArticlesType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Recommended");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [blockArticleId, setBlockArticleId] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] =
    useState<AllArticlesType | null>(null);
  const user = useSelector((state: RootState) => state.user);

  const { isPending, isSuccess, mutate, data } = useGetAllArticle();
  const { mutate: mutateBlock } = useBlockArticle();
  const { mutate: mutateLike } = useLikeArticle();
  const { mutate: mutateDislike } = useDislikeArticle();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    setArticles([]);
    setNextToken(null);
    mutate({ selectedCategory, searchQuery, lastId: null });
  }, [selectedCategory, debouncedQuery]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 300 &&
        nextToken
      ) {
        mutate({ selectedCategory, searchQuery, lastId: nextToken });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextToken, selectedCategory, debouncedQuery]);

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      setArticles((prev) => [...prev, ...data.articles]);
      setNextToken(data.nextToken);
    } 
    
  }, [isSuccess]);

  const handleLike = (articleId: string) => {
    mutateLike(articleId);
    setArticles((prev) =>
      prev.map((article) =>
        article._id === articleId
          ? {
              ...article,
              likes: article.likes.includes(user.id!)
                ? article.likes.filter((id) => id !== user.id!)
                : [...article.likes, user.id!],
              disLikes: article.likes.includes(user.id!)
                ? article.disLikes
                : article.disLikes.filter((id) => id !== user.id!),
            }
          : article
      )
    );
    if (selectedArticle?._id === articleId) {
      setSelectedArticle({
        ...selectedArticle,
        likes: selectedArticle.likes.includes(user.id!)
          ? selectedArticle.likes.filter((id) => id !== user.id!)
          : [...selectedArticle.likes, user.id!],
        disLikes: selectedArticle.likes.includes(user.id!)
          ? selectedArticle.disLikes
          : selectedArticle.disLikes.filter((id) => id !== user.id!),
      });
    }
  };

  const handleDislike = (articleId: string) => {
    mutateDislike(articleId);
    setArticles((prev) =>
      prev.map((article) =>
        article._id === articleId
          ? {
              ...article,
              disLikes: article.disLikes.includes(user.id!)
                ? article.disLikes.filter((id) => id !== user.id!)
                : [...article.disLikes, user.id!],
              likes: article.disLikes.includes(user.id!)
                ? article.likes
                : article.likes.filter((id) => id !== user.id!),
            }
          : article
      )
    );
    if (selectedArticle?._id === articleId) {
      setSelectedArticle({
        ...selectedArticle,
        disLikes: selectedArticle.disLikes.includes(user.id!)
          ? selectedArticle.disLikes.filter((id) => id !== user.id!)
          : [...selectedArticle.disLikes, user.id!],
        likes: selectedArticle.disLikes.includes(user.id!)
          ? selectedArticle.likes
          : selectedArticle.likes.filter((id) => id !== user.id!),
      });
    }
  };

  const handleBlock = (articleId: string) => {
    mutateBlock(articleId);
    setShowArticleModal(false);
    setSelectedArticle(null);
    setArticles((prev) => prev.filter((article) => article._id !== articleId));
  };

  const openArticle = (article: AllArticlesType) => {
    setSelectedArticle(article);
    setShowArticleModal(true);
  };

  useEffect(() => {
    const pending = isPending;
    dispatch(pending ? showLoader() : hideLoader());
  }, [isPending]);

  return (
    <div className="min-h-screen bg-slate-950 font-sans ">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearchVisible={true}
      />

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <FilterCategory
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Articles Grid */}
        <ArticlesGrid
          articles={articles}
          openArticle={openArticle}
          handleLike={handleLike}
          handleDislike={handleDislike}
          setBlockArticleId={setBlockArticleId}
          user={user}
        />
      </div>

      {/* Article Modal */}
      {showArticleModal && selectedArticle && (
        <ArticleModal
          selectedArticle={selectedArticle}
          setShowArticleModal={setShowArticleModal}
          handleLike={handleLike}
          handleDislike={handleDislike}
          setBlockArticleId={setBlockArticleId}
          user={user}
        />
      )}

      <AlertDialog
        open={blockArticleId !== null}
        onOpenChange={() => setBlockArticleId(null)}
      >
        <AlertDialogContent className="bg-slate-900 border-slate-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Block Article
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to block this article? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                blockArticleId && handleBlock(blockArticleId);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Block Article
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
