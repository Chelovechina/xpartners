import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import userService from "../services/user-service";
import { ApiError } from "../exceptions/api-error";

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }

      const userData = await userService.registration({
        ...req.body,
        image: req.file?.buffer,
      });

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }

      const userData = await userService.login(req.body);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);

      res.clearCookie("refreshToken");

      return res.json("Деаутентификация прошла успешно");
    } catch (err) {
      next(err);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }

      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async getPeople(req: any, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllPeopleExceptCurrent(req.user.id);
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req: any, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }

      await userService.updateUser({
        ...req.body,
        id: req.user.id,
        image: req.file?.buffer,
      });

      return res.json("Данные обновлены");
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
