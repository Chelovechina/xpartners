import { sign, verify } from "jsonwebtoken";

import { tokenModel } from "../models/token-model";
import { ITokens } from "../types/ITokens";
import { IToken } from "../types/IToken";

class TokenService {
  generateTokens(payload: { email: string; id: string }): ITokens {
    const accessToken = sign(payload, process.env.JWT_ACCESS_SECRET || "", {
      expiresIn: "30m",
    });
    const refreshToken = sign(payload, process.env.JWT_REFRESH_SECRET || "", {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  }

  validateAccessToken(token: string): any | null {
    try {
      const userData = verify(token, process.env.JWT_ACCESS_SECRET || "");
      return userData;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token: string): any | null {
    try {
      const userData = verify(token, process.env.JWT_REFRESH_SECRET || "");
      return userData;
    } catch (err) {
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string): Promise<IToken> {
    const tokenData = await tokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken: string) {
    return tokenModel.deleteOne({ refreshToken });
  }

  async findToken(refreshToken: string) {
    return tokenModel.findOne({ refreshToken });
  }
}

export default new TokenService();
