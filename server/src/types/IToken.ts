import { ObjectId } from "mongoose";

export interface IToken {
  _id: string;
  user: ObjectId;
  refreshToken: string;
}
