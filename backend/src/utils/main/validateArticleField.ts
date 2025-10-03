import {
  CreateArticleType,
  CreateOrEditErrorType,
} from "../../types/ArticleTypes";

export const validateArticleField = async (
  data: Omit<CreateArticleType, "author">
): Promise<{
  isError: boolean;
  errors: CreateOrEditErrorType;
}> => {
  let isError = false;

  const errors = {
    title: "",
    description: "",
    category: "",
    tags: "",
    coverImage: "",
    content: "",
  };

  if (!data.title.trim()) {
    errors.title = "Title is required";
    isError = true;
  } else if (data.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
    isError = true;
  }

  if (!data.description.trim()) {
    errors.description = "Description is required";
    isError = true;
  } else if (data.description.length > 300) {
    errors.description = "Description must be less than 300 characters";
    isError = true;
  }

  if (!data.category.trim()) {
    errors.category = "Category is required";
    isError = true;
  }

  if (!data.tags || data.tags.length === 0) {
    errors.tags = "At least one tag is required";
    isError = true;
  }

  if (!data.content.trim()) {
    errors.content = "Content cannot be empty";
    isError = true;
  }

  if (!data.coverImage.trim()) {
    errors.coverImage = "Cover image is required";
    isError = true;
  } else {
    const isValid = await validateImageUrl(data.coverImage);
    if (!isValid) {
      errors.coverImage = "Cover image URL is not valid or cannot be loaded";
      isError = true;
    }
  }

  return { isError, errors };
};

async function validateImageUrl(url: string): Promise<boolean> {
  const res = await fetch(url, { method: "HEAD" });
  if (!res.ok) return false;
  const contentType = res.headers.get("content-type");
  return !!contentType && contentType.startsWith("image/");
}
