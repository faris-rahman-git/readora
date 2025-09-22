import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import { TagSelector } from "@/components/features/main/Article/TagSelector";
import { useEffect, useState } from "react";
import type {
  EditOrCreateArticleErrorType,
  EditOrCreateArticleType,
} from "@/types/main/ArticleTypes";
import { ARTICLE_PREFERENCES } from "@/constent/Preferences";

function MainPart({
  article,
  setArticle,
  fieldErrors,
  setHasUnsavedChanges,
  setImageFile,
}: {
  article: EditOrCreateArticleType;
  setArticle: React.Dispatch<React.SetStateAction<EditOrCreateArticleType>>;
  fieldErrors: EditOrCreateArticleErrorType;
  setHasUnsavedChanges?: React.Dispatch<React.SetStateAction<boolean>>;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setArticle((prev) => ({ ...prev, [field]: value }));
    setHasUnsavedChanges?.(true);
  };

  const handleTagsChange = (tags: string[]) => {
    setArticle((prev) => ({ ...prev, tags }));
    setHasUnsavedChanges?.(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImageFile(file);
    }
  };

  const removeImage = () => {
    setArticle((prev) => ({ ...prev, coverImage: "" }));
    setImagePreview(null);
    setImageFile(null);
  };

  useEffect(() => {
    if (article.coverImage) {
      setImagePreview(article.coverImage);
    }
  }, [article]);

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Article Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-slate-300">
              Article Title *
            </Label>
            <Input
              id="title"
              value={article.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter an engaging title for your article"
              className="bg-slate-800 border-slate-700 text-white focus:border-emerald-500"
            />
            {fieldErrors.title && (
              <p className="text-red-500">{fieldErrors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-300">
              Description *
            </Label>
            <Textarea
              id="description"
              value={article.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Write a brief description that summarizes your article"
              rows={3}
              className="bg-slate-800 border-slate-700 text-white focus:border-emerald-500 resize-none"
            />
            {fieldErrors.description && (
              <p className="text-red-500">{fieldErrors.description}</p>
            )}
          </div>

          {/* Category and Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-slate-300">Category *</Label>
              <Select
                value={article.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white focus:border-emerald-500">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {ARTICLE_PREFERENCES.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="text-white hover:bg-slate-700"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldErrors.category && (
                <p className="text-red-500">{fieldErrors.category}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Tags *</Label>
              <TagSelector
                selectedTags={article.tags}
                onTagsChange={handleTagsChange}
              />
              {fieldErrors.tags && (
                <p className="text-red-500">{fieldErrors.tags}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Images */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Cover Image *</CardTitle>
        </CardHeader>
        <CardContent>
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Article cover preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={removeImage}
                className="absolute top-2 right-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <label
              htmlFor="image-upload"
              className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center cursor-pointer block hover:border-emerald-500 transition"
            >
              <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400">Click to upload cover image</p>

              {/* Hidden input */}
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
          {fieldErrors.coverImage && (
            <p className="text-sm text-center text-red-500 mt-2">
              {fieldErrors.coverImage}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Content */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Article Content *</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={article.content}
            onChange={(e) => handleInputChange("content", e.target.value)}
            placeholder="Write your article content here..."
            rows={20}
            className="bg-slate-800 border-slate-700 text-white focus:border-emerald-500 resize-none"
          />
          {fieldErrors.content && (
            <p className="text-red-500">{fieldErrors.content}</p>
          )}
          <p className="text-sm text-slate-500 mt-2">
            {article.content.length} characters •{" "}
            {Math.ceil(article.content.length / 1000)} min read
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default MainPart;
