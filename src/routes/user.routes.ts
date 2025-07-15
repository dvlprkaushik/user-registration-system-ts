import { createUser } from "@/controllers/user.controller.js";
import { validatorBody } from "@/middlewares/validator.middleware.js";
import { userSchema } from "@/validations/user.schema.js";
import { Router } from "express";

const userRoute = Router();

userRoute.post("/auth/register",validatorBody(userSchema),createUser);

export { userRoute };