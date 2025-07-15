import { z } from "zod";
import dayjs from "dayjs";
import { USERS } from "@/controllers/user.controller.js";
import type { User } from "@/types/user.types.js";

const nameRegex = /^[A-Za-z][A-Za-z-' ]{1,49}$/;

const nameSchema = z
  .string()
  .min(2, { message: "Must be at least 2 characters" })
  .max(50, { message: "Must be at most 50 characters" })
  .regex(nameRegex, {
    message: "Only letters, hyphens, apostrophes allowed. No numbers/symbols.",
  });

const blockedDomains: string[] = [
  "mailinator.com",
  "yopmail.com",
  "tempmail.com",
];
const existingUsers: User[] = USERS;

const emailSchema = z
  .email({ message: "Invalid email format" })
  .max(320, { message: "Email must be ≤ 320 characters" })
  .refine(
    (email) => {
      const domain = email.split("@")[1]?.toLowerCase();
      return domain && !blockedDomains.includes(domain);
    },
    { message: "Disposable or blocked domains are not allowed" }
  )
  .refine((email) => !existingUsers.map(e => e.email).includes(email), {
    message: "Email already taken",
  });

const passwordSchema = z
  .string()
  .min(8, { message: "Must be at least 8 characters" })
  .regex(/(?=.*[a-z])/, { message: "Must include a lowercase letter" })
  .regex(/(?=.*[A-Z])/, { message: "Must include an uppercase letter" })
  .regex(/(?=.*\d)/, { message: "Must include a digit" })
  .regex(/(?=.*[^A-Za-z0-9])/, { message: "Must include a special character" });

const phoneSchema = z.string().regex(/^\+91[6-9]\d{9}$/, {
  message: "Phone must be in +91XXXXXXXXXX format",
});

const dobSchema = z.string().refine(
  (value) => {
    const age = dayjs().diff(dayjs(value), "year");
    return age >= 18;
  },
  {
    message: "You must be at least 18 years old",
  }
);

const agreeToTermsSchema = z.literal(true, {
  message: "You must accept the terms and conditions",
});

// 🧾 Register schema (all combined)
const userSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    phoneNumber: phoneSchema,
    dateOfBirth: dobSchema,
    agreeToTerms: agreeToTermsSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export { userSchema };
