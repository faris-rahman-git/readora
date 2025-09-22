import axios from "axios";
const UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dvr382ysh/image/upload";

export const uploadImageApi = async (formData: FormData) => {
  const res = await axios.post(UPLOAD_URL, formData);
  return res.data;
};
