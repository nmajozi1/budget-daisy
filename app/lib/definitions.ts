import { z } from 'zod';
 
export const SignInFormSchema = z.object({
  username: z.string().min(2, { message: 'Username must be at least 2 characters long.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {message: 'Contain at least one special character.',})
    .trim(),
});

export const AddItemSchema = z.object({
  item: z.string().min(2, { message: 'Item must at least be 2 characters long' }).trim(),
  description: z.string().min(2, { message: 'Description must at least be 2 characters long' }).trim(),
  amount: z
    .number({required_error: "Amount is required", invalid_type_error: "Amount must be a number",})
    .positive(),
});

export const SignUpFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
  surname: z.string().min(2, { message: 'Surname must be at least 2 characters long.' }).trim(),
  username: z.string().min(2, { message: 'Username must be at least 2 characters long.' }).trim(),
  email: z
    .string()
    .min(2, { message: 'Email must be at least 2 characters long.' })
    .email({ message: "Invalid email address" })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {message: 'Contain at least one special character.',})
    .trim(),
});