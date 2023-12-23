import multer from "multer";
import { Router } from "express";
import { body } from "express-validator";

import userController from "../controllers/user-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

export const router: Router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/registration",
  upload.single("image"),
  body("email").isEmail(),
  body("password").isString().isLength({ min: 3, max: 32 }),
  body("day").isString(),
  body("month").isString(),
  body("year").isString(),
  body("name").isString(),
  body("gender").isIn(["male", "female"]),
  userController.registration
);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isString().isLength({ min: 3, max: 32 }),
  userController.login
);

router.post("/logout", userController.logout);

router.patch(
  "/account",
  authMiddleware,
  upload.single("image"),
  body("password").isString().isLength({ min: 3, max: 32 }),
  body("name").isString(),
  userController.updateUser
);

router.get("/refresh", userController.refresh);

router.get("/people", authMiddleware, userController.getPeople);
