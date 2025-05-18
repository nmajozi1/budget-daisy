import mongoose from "mongoose";
import { ItemSchema } from "./items.schema";

const ItemModel = mongoose?.models?.Item || mongoose.model('Item', ItemSchema);

export default ItemModel;