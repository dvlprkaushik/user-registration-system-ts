import type { userSchema } from "@/validations/user.schema.js";
import type z from "zod";

export type UserBody = z.infer<typeof userSchema>;
export type DestructUser = Omit<UserBody, "confirmPassword">;
export type User = Omit<UserBody, "confirmPassword"> & {
  userId: string;
  createdAt: string;
};
export type SafeUser = Omit<User, "password" | "phoneNumber" | "agreeToTerms">;
