import { compare, hash } from "bcrypt";

import tokenService from "./token-service";
import { userModel } from "../models/user-model";
import { ApiError } from "../exceptions/api-error";
import { UserDto } from "../dtos/user-dto";
import { ICreateUser } from "../types/ICreateUser";
import { ILoginUser } from "../types/ILoginUser";
import { IUser } from "../types/IUser";
import { IAuthorizedUser } from "../types/IAuthorizedUser";
import fileService from "./file-service";
import { IUpdateUser } from "../types/IUpdateUser";

class UserService {
  private async generateAndSaveTokens(user: IUser): Promise<IAuthorizedUser> {
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(user._id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async registration(dto: ICreateUser): Promise<IAuthorizedUser> {
    const candidate = await userModel.findOne({ email: dto.email });

    if (candidate) {
      throw ApiError.BadRequest("Пользователь с таким email уже существует");
    }

    const imagePath = await fileService.saveFile(dto.image);
    const hashedPassword = await hash(dto.password, 3);
    const user = await userModel.create({
      name: dto.name,
      email: dto.email,
      gender: dto.gender,
      birthDate: `${dto.year}-${dto.month}-${dto.day}`,
      imageUrl: imagePath,
      password: hashedPassword,
    });

    return this.generateAndSaveTokens(user);
  }

  async login(dto: ILoginUser): Promise<IAuthorizedUser> {
    const user = await userModel.findOne({ email: dto.email });
    if (!user) {
      throw ApiError.BadRequest("Неверный логин или пароль");
    }

    const isPassEquals = await compare(dto.password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный логин или пароль");
    }

    return this.generateAndSaveTokens(user);
  }

  async logout(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    return tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }

    const user = await userModel.findById(userData.id);
    return this.generateAndSaveTokens(user as IUser);
  }

  async getAllPeopleExceptCurrent(userId: string) {
    const users = await userModel.find().select("imageUrl name birthDate");
    const updatedUsers: IUser[] = users.filter(
      (user: IUser) => user._id != userId
    );
    return updatedUsers;
  }

  async updateUser(dto: IUpdateUser) {
    const user = await userModel.findById(dto.id);

    if (!user) {
      throw ApiError.UnauthorizedError();
    }

    const imagePath = await fileService.replaceFile(dto.image, user.imageUrl);
    const hashedPassword = await hash(dto.password, 3);

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: user._id },
      {
        email: user.email,
        name: dto.name,
        gender: user.gender,
        birthDate: user.birthDate,
        password: hashedPassword,
        imageUrl: imagePath,
      }
    );

    return updatedUser?.save();
  }
}

export default new UserService();
