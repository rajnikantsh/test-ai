"use client";

import { useRouter } from "next/navigation";
import AuthShell, { BackToLogin } from "@/components/auth/AuthShell";
import Button from "@/components/ui/Button";

/**
 * Terminal screen in the password reset flow.
 * Backend integration will confirm the token was consumed before rendering this page.
 */
export default function ResetSuccessPage() {
  const router = useRouter();

  return (
    <AuthShell
      heading="Password reset"
      subtitle="Your password has been successfully reset. Click below to log in magically."
    >
      <Button type="button" onClick={() => router.push("/auth/login")}>
        Continue
      </Button>

      <div className="mt-6 flex justify-center">
        <BackToLogin />
      </div>
    </AuthShell>
  );
}
