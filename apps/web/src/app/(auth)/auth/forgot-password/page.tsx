"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthShell, { BackToLogin } from "@/components/auth/AuthShell";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/features/auth/schemas";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  /**
   * Navigates to the check-email confirmation screen, passing the submitted
   * email as a query param so it can be displayed in the confirmation message.
   * encodeURIComponent ensures the value is URL-safe (handles + and @ symbols).
   *
   * Backend integration will replace this with an API call to trigger the
   * password reset email before navigating.
   */
  function onSubmit(data: ForgotPasswordFormData) {
    router.push(
      `/auth/check-email?email=${encodeURIComponent(data.email)}`
    );
  }

  return (
    <AuthShell
      heading="Forgot password?"
      subtitle="No worries, we'll send you reset instructions."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
        noValidate
      >
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder="Enter your email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Button type="submit">Reset password</Button>
      </form>

      <div className="mt-6 flex justify-center">
        <BackToLogin />
      </div>
    </AuthShell>
  );
}
