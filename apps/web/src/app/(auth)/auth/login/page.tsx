"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthShell from "@/components/auth/AuthShell";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { loginSchema, type LoginFormData } from "@/features/auth/schemas";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: LoginFormData) {
    console.log("login", data);
  }

  return (
    <AuthShell
      heading="Log in to your account"
      subtitle="Welcome back! Please enter your details."
      showLogo
    >
      {/* noValidate disables native browser validation popups in favour of
          the styled inline errors provided by react-hook-form + Zod. */}
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
        <Input
          label="Password"
          type="password"
          id="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Button type="submit">Sign in</Button>
      </form>

      <div className="mt-6 flex flex-col items-center gap-2 text-sm">
        <p className="text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold text-brand hover:text-brand/80"
          >
            Sign up
          </Link>
        </p>
        <Link
          href="/auth/forgot-password"
          className="font-semibold text-brand hover:text-brand/80"
        >
          Forgot password
        </Link>
      </div>
    </AuthShell>
  );
}
