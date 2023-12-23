import { IUser } from "../types/IUser";

export class UserDto {
  email: string = "";
  id: string = "";

  constructor(user: IUser) {
    this.email = user.email;
    this.id = user._id;
  }
}
