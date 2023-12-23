import { Schema, model } from "mongoose";
import { IUser } from "../types/IUser";

export const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  birthDate: { type: Date, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  imageUrl: { type: String, required: true },
});

export const userModel = model("User", UserSchema);
