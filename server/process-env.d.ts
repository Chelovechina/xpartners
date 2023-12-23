import { Secret } from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: number;
      DB_URL: string;
      JWT_ACCESS_SECRET: Secret;
      JWT_REFRESH_SECRET: Secret;
      CLIENT_URL: string;
    }
  }
}
