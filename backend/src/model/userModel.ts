import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  phoneNumber: { type: String, unique: true, required: true },
  avatar: { type: String },
  email: { type: String, unique: true, required: true },
  DOB: { type: Date },
  password: { type: String, required: true },
  preferences: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export default model("userModel", UserSchema);
