import type {
  EditOrCreateArticleErrorType,
  EditOrCreateArticleType,
} from "@/types/main/ArticleTypes";

export const validateArticleField = (
  data: EditOrCreateArticleType,
  setFieldErrors: React.Dispatch<
    React.SetStateAction<EditOrCreateArticleErrorType>
  >
): boolean => {
  let result = true;

  const errors: EditOrCreateArticleErrorType = {
    title: "",
    description: "",
    category: "",
    tags: "",
    coverImage: "",
    content: "",
  };

  if (!data.title.trim()) {
    errors.title = "Title is required";
    result = false;
  } else if (data.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
    result = false;
  }

  if (!data.description.trim()) {
    errors.description = "Description is required";
    result = false;
  } else if (data.description.length > 300) {
    errors.description = "Description must be less than 300 characters";
    result = false;
  }

  if (!data.category.trim()) {
    errors.category = "Category is required";
    result = false;
  }

  if (!data.tags || data.tags.length === 0) {
    errors.tags = "At least one tag is required";
    result = false;
  }

  if (!data.content.trim()) {
    errors.content = "Content cannot be empty";
    result = false;
  }

  setFieldErrors(errors);

  return result;
};
