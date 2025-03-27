import { z } from "zod";

export const formSchema = z.object({
  phoneNumbers: z.array(
    z.string().min(10, "Please enter a valid phone number")
  ),
  message: z.string().min(1, "Message cannot be empty"),
  schedule: z.string().min(1, "Please select a schedule"),
  isActive: z.boolean().default(true),
});

export const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const signUpSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
