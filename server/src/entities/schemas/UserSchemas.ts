import { z } from "zod";

export const CreateUserSchema = z.object({
    name: z.string(),
    lastname: z.string(),
    username: z.string(),
    email: z.string(),
    password: z.string(),
    phoneNumber: z.string()
})
export const SignInSchema = z.object({
    username: z.string().optional(),
    email: z.string().optional(),
    password: z.string(),
})
export const UpdateUserSchema = z.object({
    id:z.number(),
    name: z.string().optional(),
    lastname: z.string().optional(),
})
export const ChangePasswordSchema = z.object({
    lastPassword:z.string(),
    newPassword:z.string()
  })