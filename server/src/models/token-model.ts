import { Schema, model } from "mongoose";
import { IToken } from "../types/IToken";

const TokenSchema = new Schema<IToken>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  refreshToken: { type: String, required: true },
});

export const tokenModel = model("Token", TokenSchema);
