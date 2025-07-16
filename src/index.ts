import express from "express";
import dotenv from "dotenv";
import {
  errorHandler,
  notFoundHandler,
  parserAndLogger,
} from "./middlewares/global.middleware.js";
import chalk from "chalk";
import { userRoute } from "./routes/user.routes.js";
import { userLimiter } from "./middlewares/limiter.middleware.js";

dotenv.config({ quiet: true });

const app = express();
parserAndLogger(app, express);

// health-check
app.get("/", (req, res) => res.status(200).json({ status: "OK" }));

// * Route
app.use("/api/v1", userRoute);

app.use(notFoundHandler);
app.use(errorHandler);

const { PORT, BASE_URL } = process.env;
app.listen(PORT, () =>
  console.log(
    chalk.bold.magentaBright(`Server running on : ${BASE_URL}:${PORT}`)
  )
);
