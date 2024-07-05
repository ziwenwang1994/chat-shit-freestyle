import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  cors({
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "http://127.0.0.1:5000",
      "http://localhost:5000",
      "https://chat-shit-freestyle-otx89oh7g-svens-projects-b5f75a36.vercel.app",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use("/api/v1", appRouter);

export default app;
