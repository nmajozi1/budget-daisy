import mongoose from "mongoose";

export const IncomeSchema = new mongoose.Schema({
  name: { type: String, default: null },
  description: { type: String, default: null },
  amount: { type: Number, default: 0 },
  userId: { type: String, default: null }
});