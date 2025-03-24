import { z } from "zod";
import { userRoles } from "@/drizzle/schema";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const signUpSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required"
  }),
  email: z.string().email({
    message: "Invalid email address"
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long"
  }),
})

export const sessionSchema = z.object({
  id: z.string(),
  role: z.enum(userRoles),
});