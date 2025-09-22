import { Schema, model } from "mongoose";

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  coverImage: { type: String },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "userModel", required: true },
  blockedUsers: [{ type: Schema.Types.ObjectId, ref: "userModel" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "userModel" }],
  disLikes: [{ type: Schema.Types.ObjectId, ref: "userModel" }],
  createdAt: { type: Date, default: Date.now },
});

export default model("articleModel", ArticleSchema);
