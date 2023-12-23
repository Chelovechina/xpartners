import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { router } from "./router";
import { errorMiddleware } from "./middlewares/error-middleware";
import path from "path";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || "";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "*",
  })
);
app.use("/api", router);
app.use(express.static(path.join(__dirname, "static")));
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (e) {
    console.error(e);
  }
};

start();
