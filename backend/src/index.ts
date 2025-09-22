import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import nocache from "nocache";
import helmet from "helmet";
import morgan from "morgan";

import connectMongo from "./config/db";
import authRoute from "./routes/auth/authRoute";
import settingsRoute from "./routes/main/settingsRoute";
import articleRoute from "./routes/main/articleRoute";
import homeRoute from "./routes/main/homeRoute";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// Middlewares
app.use(nocache());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));

connectMongo();

// Routes
app.use("/api/auth", authRoute);
app.use("/api/settings", settingsRoute);
app.use("/api/article", articleRoute);
app.use("/api/home", homeRoute);

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
