import mongoose from "mongoose";
import { IncomeSchema } from "./income.schema";

const IncomeModel = mongoose?.models?.Income || mongoose.model('Income', IncomeSchema);

export default IncomeModel;