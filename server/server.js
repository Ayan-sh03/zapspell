import express from "express";

import cors from "cors";
import { configDotenv } from "dotenv";
import morgan from "morgan";
import { connectDB } from "./src/DB/connect.js";
import { attemptRouter } from "./src/Route/Attempt.js";
import { userRouter } from "./src/Route/User.js";
import { wordRouter } from "./src/Route/Word.js";
import { resultRouter } from "./src/Route/Result.js";
import { authorizationMiddleware } from "./src/Middleware/Auth.js";
export const app = express();
configDotenv();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//!-- Routers --!//
app.use("/api/v1/user", userRouter);

app.use("/api/v1/word", wordRouter);
app.use("/api/v1/attempt", authorizationMiddleware, attemptRouter);
app.use("/api/v1/result", authorizationMiddleware, resultRouter);

app.get("/", (_, res) => {
  res.json({ message: "hello world" });
});

const PORT = process.env.PORT || 3000;
const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      console.log("Connected to DB 📝")
      console.log("Server is listening 🚀", PORT)
      // app.listen(PORT, () => console.log("Server is listening 🚀", PORT));
    } catch (err) {
      console.log(err);
    }
  };

//   start();

app.listen(PORT, () => start());
