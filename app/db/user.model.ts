import mongoose from "mongoose";
import { UserSchema } from "./user.schema";

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;