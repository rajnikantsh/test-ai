"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthShell, { BackToLogin } from "@/components/auth/AuthShell";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/features/auth/schemas";

/**
 * CheckIcon renders a circular check mark whose color reflects whether
 * a password rule is currently satisfied. The `met` prop drives the color:
 * brand (rule met) vs. gray-300 (rule not yet met), providing real-time
 * visual feedback as the user types — before they attempt to submit.
 */
function CheckIcon({ met }: { met: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={met ? "text-brand" : "text-gray-300"}
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5.5 8L7 9.5L10.5 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = watch("password") ?? "";
  const hasMinLength = password.length >= 8;
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);

  // Frontend-only navigation. Backend integration will verify the reset token
  // and persist the new password before this redirect occurs.
  function onSubmit(_data: ResetPasswordFormData) {
    router.push("/auth/reset-success");
  }

  return (
    <AuthShell
      heading="Set new password"
      subtitle="Your new password must be different to previously used passwords."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
        noValidate
      >
        <Input
          label="Password"
          type="password"
          id="password"
          placeholder="••••••••"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <div className="flex flex-col gap-2">
          <Input
            label="Confirm password"
            type="password"
            id="confirmPassword"
            placeholder="••••••••"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <div className="flex flex-col gap-1.5 pt-1">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckIcon met={hasMinLength} />
              Must be at least 8 characters
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckIcon met={hasSpecialChar} />
              Must contain one special character
            </div>
          </div>
        </div>

        <Button type="submit">Reset password</Button>
      </form>

      <div className="mt-6 flex justify-center">
        <BackToLogin />
      </div>
    </AuthShell>
  );
}
