import chalk from "chalk";
import type { Application, ErrorRequestHandler, RequestHandler } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { v4 as uuid } from "uuid";

export const parserAndLogger = (
  app: Application,
  express: typeof import("express")
): void => {
  app.use([express.json(), express.urlencoded({ extended: true })]);
  app.use(helmet());
  app.use((req, res, next) => {
    const id = uuid();
    req.id = id;
    res.setHeader("x-request-id", id);
    next();
  })
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }
};

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({ success: false, message: "Oops!! route not found" });
};

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  console.log(chalk.red.bold("🔥 Error:"), err);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : undefined,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

