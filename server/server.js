import express from "express";
import client from "prom-client";
import cors from "cors";
import responseTime from "response-time";
import { configDotenv } from "dotenv";
import morgan from "morgan";
import { connectDB } from "./src/DB/connect.js";
import { attemptRouter } from "./src/Route/Attempt.js";
import { userRouter } from "./src/Route/User.js";
import { wordRouter } from "./src/Route/Word.js";
import { resultRouter } from "./src/Route/Result.js";
import { authorizationMiddleware } from "./src/Middleware/Auth.js";
import { getLeaderboard } from "./src/Controller/Result.js";
export const app = express();
configDotenv();

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

const reqResTime = new client.Histogram({
  name: "request_response_time_seconds",
  help: "Request response time in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.5, 1, 2, 50, 100, 200, 400, 800, 1000, 2000],
});

app.use(
  responseTime((req, res, time) => {
    reqResTime
      .labels({
        method: req.method,
        route: req.url,
        status_code: res.statusCode,
      })
      .observe(time);
  })
);
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//!-- Routers --!//
app.use("/api/v1/user", userRouter);
app.get("/metrics", async (req, res) => {
  try {
    res.setHeader("Content-Type", client.register.contentType);
    const metrics = await client.register.metrics();
    if (metrics) {
      res.send(metrics);
    } else {
      res.status(404).send("No metrics available");
    }
  } catch (error) {
    console.error("Error collecting metrics:", error);
    res.status(500).send("Error collecting metrics");
  }
});

app.use("/api/v1/word", wordRouter);
app.use("/api/v1/attempt", authorizationMiddleware, attemptRouter);
app.use("/api/v1/result", authorizationMiddleware, resultRouter);
app.use("/api/v1/leaderboard", getLeaderboard);
app.get("/", (_, res) => {
  res.json({ message: "hello world" });
});

const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to DB 📝");
    console.log("Server is listening 🚀", PORT);
    // app.listen(PORT, () => console.log("Server is listening 🚀", PORT));
  } catch (err) {
    console.log(err);
  }
};

//   start();

app.listen(PORT, () => start());
