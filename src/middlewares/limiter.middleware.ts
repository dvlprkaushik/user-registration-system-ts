import rateLimit from "express-rate-limit";

export const userLimiter = rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW),
    max: Number(process.env.RATE_LIMIT_MAX_REQUESTS),
    message: "Too many requests, please try again later",
});