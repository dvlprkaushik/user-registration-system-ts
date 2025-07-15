import path from "path";
import { v4 as uuid } from "uuid";
import type { DestructUser, User, UserBody } from "@/types/user.types.js";
import type { RequestHandler } from "express";
import { mkdir, readFile, writeFile } from "fs/promises";
import { sanitizeUser } from "@/utils/sanitizeUser.js";

const USERS: User[] = [];
export const createUser: RequestHandler<{}, {}, UserBody> = async (
  req,
  res
) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    dateOfBirth,
    agreeToTerms,
  }: DestructUser = req.body;

  const newUser: User = {
    userId: uuid(),
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    agreeToTerms,
    phoneNumber,
    createdAt: new Date().toISOString(),
  };

  try {
    const filePath = path.join(process.cwd(), "data", "users.json");

    await mkdir(path.dirname(filePath), { recursive: true });

    let existingUsers: User[] = [];
    try {
      const fileData = await readFile(filePath, "utf-8");
      existingUsers = JSON.parse(fileData);
    } catch (error: any) {
      if (error.code !== "ENOENT") throw error;
    }

    const isDuplicate = existingUsers.some(
      (user) => user.email === email || user.phoneNumber === phoneNumber
    );

    if (isDuplicate) {
      return res.status(409).json({
        success: false,
        message: "User with this email or phone number already exists",
      });
    }

    existingUsers.push(newUser);
    await writeFile(filePath, JSON.stringify(existingUsers, null, 2), "utf-8");

    const safeUser = sanitizeUser(newUser);
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: safeUser,
    });
  } catch (error) {}
};
