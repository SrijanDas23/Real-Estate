import { z } from "zod";

export const updateUserSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast 3 characters" })
    .max(255, "Name must not exceed 255 characters")
    .optional(),

  email: z
    .string({ required_error: "email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be atleast 3 characters" })
    .max(255, "Email must not exceed 255 characters")
    .optional(),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be atleast 6 characters" })
    .max(1024, "Password must not exceed 255 characters")
    .optional(),

  avatar: z.any().optional(),
});
