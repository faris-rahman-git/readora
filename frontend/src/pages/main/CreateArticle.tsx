import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send } from "lucide-react";
import Header from "@/components/features/main/home/Header";
import { Link, useNavigate } from "react-router-dom";
import MainPart from "@/components/features/main/Article/MainPart";
import type {
  EditOrCreateArticleErrorType,
  EditOrCreateArticleType,
} from "@/types/main/ArticleTypes";
import type { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { validateArticleField } from "@/utils/validateArticleField";
import { usePublishArticle } from "@/hooks/main/article/usePublishArticle";
import { hideLoader, showLoader } from "@/redux/features/common/LoaderSlice";
import { useUploadImage } from "@/hooks/common/useUploadImage";

export default function CreateArticle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.user.id)!;
  const [article, setArticle] = useState<EditOrCreateArticleType>({
    title: "",
    description: "",
    category: "",
    tags: [],
    coverImage: "",
    content: "",
    author: userId,
  });
  const [fieldErrors, setFieldErrors] = useState<EditOrCreateArticleErrorType>({
    title: "",
    description: "",
    category: "",
    tags: "",
    coverImage: "",
    content: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { isPending, isSuccess, mutate } = usePublishArticle();
  const {
    isPending: isPendingUpload,
    mutate: mutateUpload,
    data: dataUpload,
    isSuccess: isSuccessUpload,
  } = useUploadImage();

  const handlePublish = () => {
    const isValid = validateArticleField(article, setFieldErrors);
    if (!isValid) return;
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "readora_medias");
      setImageFile(null);
      mutateUpload(formData);
    } else {
      setFieldErrors((prev) => ({
        ...prev,
        coverImage: "Cover image is required",
      }));
      return;
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/my-articles");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isSuccessUpload) {
      mutate({
        ...article,
        coverImage: dataUpload.secure_url,
      });
    }
  }, [isSuccessUpload]);

  useEffect(() => {
    const pending = isPending || isPendingUpload;
    dispatch(pending ? showLoader() : hideLoader());
  }, [isPending, isPendingUpload]);

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/my-articles">
                <Button variant="default" size="sm" className="text-slate-400 ">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Create Article
                </h1>
                <p className="text-slate-400">
                  Share your thoughts with the Readora community
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handlePublish}
                className="border-slate-700 text-slate-300 hover:text-slate-300 bg-emerald-600 hover:bg-emerald-700"
              >
                <Send className="h-4 w-4 mr-2" />
                Publish Article
              </Button>
            </div>
          </div>

          <MainPart
            article={article}
            setArticle={setArticle}
            fieldErrors={fieldErrors}
            setImageFile={setImageFile}
          />
        </div>
      </main>
    </div>
  );
}
