import type { SafeUser, User } from "@/types/user.types.js";

export const sanitizeUser = (user: User): SafeUser => {
  const { password, agreeToTerms, phoneNumber, ...safeUser } = user;
  return safeUser;
};
