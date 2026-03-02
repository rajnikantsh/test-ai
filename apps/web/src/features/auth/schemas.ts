import { z } from "zod";

/**
 * Auth form validation schemas.
 *
 * Zod is used over manual validation because it:
 *  1. Enforces field rules at runtime, catching edge cases before submission.
 *  2. Infers TypeScript types via z.infer, eliminating duplicate type definitions.
 *  3. Integrates directly with react-hook-form via zodResolver, mapping
 *     parse errors onto field paths automatically.
 */

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

/**
 * The regex /[^a-zA-Z0-9]/ matches any character that is NOT alphanumeric,
 * i.e. it passes when the password contains at least one special character.
 *
 * .refine() is necessary for the confirmPassword cross-field check.
 * Zod evaluates fields independently by default, so a rule that reads
 * another field's value cannot be expressed at the field level — it
 * requires a schema-level refinement. path: ["confirmPassword"] ensures
 * the error attaches to the correct input rather than the form root.
 */
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Must be at least 8 characters")
      .regex(/[^a-zA-Z0-9]/, "Must contain one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Types are inferred directly from schemas so form data types and
// validation rules are always in sync with zero duplication.
export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
