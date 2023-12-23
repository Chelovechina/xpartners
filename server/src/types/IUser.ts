export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  birthDate: Date;
  gender: "male" | "female";
  imageUrl: string;
}
