"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AuthShell, { BackToLogin } from "@/components/auth/AuthShell";
import Button from "@/components/ui/Button";

function CheckEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "your email";

  function handleOpenEmail() {
    window.open("https://mail.google.com", "_blank");
  }

  // Frontend stub — will trigger a resend API call once backend is integrated.
  function handleResend() {
    console.log("resend to", email);
  }

  return (
    <AuthShell
      heading="Check your email"
      subtitle={`We sent a password reset link to ${email}`}
    >
      <div className="flex flex-col gap-5">
        <Button type="button" onClick={handleOpenEmail}>
          Open email app
        </Button>
      </div>

      <div className="mt-6 flex flex-col items-center gap-4 text-sm">
        <p className="text-gray-500">
          Didn&apos;t receive the email?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="font-semibold text-brand hover:text-brand/80"
          >
            Click to resend
          </button>
        </p>
        <BackToLogin />
      </div>
    </AuthShell>
  );
}

/**
 * useSearchParams() is a dynamic API that requires a Suspense boundary in
 * the Next.js App Router. Without it the build throws a static generation
 * error. CheckEmailContent is extracted so the Suspense wrapper stays minimal.
 */
export default function CheckEmailPage() {
  return (
    <Suspense fallback={null}>
      <CheckEmailContent />
    </Suspense>
  );
}
