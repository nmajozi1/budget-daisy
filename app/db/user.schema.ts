import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  name: { type: String, default: null },
  surname: { type: String, default: null },
  username: { type: String, default: null },
  password: { type: String, default: null },
  email: { type: String, default: null },
  profilePicture: { type: String, default: null },
});