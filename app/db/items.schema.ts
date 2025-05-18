import mongoose from "mongoose";

export const ItemSchema = new mongoose.Schema({
  name: { type: String, default: null },
  description: { type: String, default: null },
  amount: { type: Number, default: 0 },
  userId: { type: String, default: null },
  paid: { type: Boolean, default: false },
  image:{ type: String, default: null },
});