import express from "express";
import { config } from "./src/config/config.js";
import { startDbServer } from "./src/db/configure.js";
import type { Server } from "node:http";
import { authRouter } from "./src/routers/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { generateInterviewReport } from "./src/services/ai.service.js";

import { interviewRouter } from "./src/routers/interview.routes.js";

const app = express();
const PORT = config.port ?? 8000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

const startServer = async (): Promise<Server> => {
  await startDbServer();

  return app.listen(PORT, () => {
    console.log("THE SERVER IS UP AND RUNNING ON PORT ", PORT);
  });
};

let server: Server;

try {
  server = await startServer();
} catch (error) {
  console.error("ERROR WHILE STARTING THE SERVER", error);
  process.exit(1);
}
