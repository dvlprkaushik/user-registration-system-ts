import { Router } from "express";

const userRoute = Router();

userRoute.post("/auth/register");

export { userRoute };