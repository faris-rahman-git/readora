import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import Header from "@/components/features/main/home/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainPart from "@/components/features/main/Article/MainPart";
import type {
  EditOrCreateArticleErrorType,
  EditOrCreateArticleType,
} from "@/types/main/ArticleTypes";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useUploadImage } from "@/hooks/common/useUploadImage";
import { showLoader, hideLoader } from "@/redux/features/common/LoaderSlice";
import { validateArticleField } from "@/utils/validateArticleField";
import { useUpdateArticle } from "@/hooks/main/article/useUpdateArticle";
import { useGetEditArticleDetails } from "../../hooks/main/article/useGetEditArticleDetails";

export default function EditArticle() {
  const params = useParams();
  const articleId = params.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.user.id);
  const [article, setArticle] = useState<EditOrCreateArticleType>({
    title: "",
    description: "",
    category: "",
    tags: [],
    coverImage: "",
    content: "",
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
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (article.author && article?.author !== userId) {
      navigate("/my-articles");
    }
  }, [article]);

  const { isPending, isSuccess, mutate, data } = useGetEditArticleDetails();
  const {
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
    mutate: mutateUpdate,
  } = useUpdateArticle();
  const {
    isPending: isPendingUpload,
    mutate: mutateUpload,
    data: dataUpload,
    isSuccess: isSuccessUpload,
  } = useUploadImage();

  const handleSave = () => {
    console.log(article);
    const isValid = validateArticleField(article, setFieldErrors);
    if (!isValid) return;
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "readora_medias");
      setImageFile(null);
      mutateUpload(formData);
    } else if (!article.coverImage) {
      setFieldErrors((prev) => ({
        ...prev,
        coverImage: "Cover image is required",
      }));
      return;
    } else {
      handleUpdateMutate();
    }
  };

  const handleUpdateMutate = (coverImage: string = article.coverImage) => {
    mutateUpdate({
      data: {
        title: article.title,
        category: article.category,
        description: article.description,
        tags: article.tags,
        content: article.content,
        coverImage,
      },
      articleId: article._id!,
    });
  };

  useEffect(() => {
    mutate(articleId!);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setArticle(data.articleDetails);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isSuccessUpdate) {
      navigate("/my-articles");
    }
  }, [isSuccessUpdate]);
  useEffect(() => {
    if (isSuccessUpload) {
      handleUpdateMutate(dataUpload.secure_url);
    }
  }, [isSuccessUpload]);

  useEffect(() => {
    const pending = isPending || isPendingUpload || isPendingUpdate;
    dispatch(pending ? showLoader() : hideLoader());
  }, [isPending, isPendingUpload, isPendingUpdate]);

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
                <h1 className="text-3xl font-bold text-white">Edit Article</h1>
                <p className="text-slate-400">
                  Make changes to your published article
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {hasUnsavedChanges && (
                <div className="flex items-center gap-2 text-yellow-400 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  Unsaved changes
                </div>
              )}
              <Button
                variant="outline"
                onClick={handleSave}
                className="border-slate-700 text-slate-300 hover:text-slate-300 bg-emerald-600 hover:bg-emerald-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>

          {/* Status Info */}
          <Card className="bg-slate-900 border-slate-800 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {article.createdAt && (
                    <span className="text-slate-400 text-sm">
                      Published on{" "}
                      {new Date(article.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <div className="text-slate-400 text-sm">
                  Article ID: {articleId}
                </div>
              </div>
            </CardContent>
          </Card>

          <MainPart
            article={article}
            setArticle={setArticle}
            setHasUnsavedChanges={setHasUnsavedChanges}
            fieldErrors={fieldErrors}
            setImageFile={setImageFile}
          />
        </div>
      </main>
    </div>
  );
}
