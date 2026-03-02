import Link from "next/link";

/**
 * AuthShell — shared structural wrapper used across all auth pages.
 *
 * Centralizes the heading, subtitle, and optional logo so each page
 * only provides its own form content. The showLogo prop is opt-in so
 * pages deeper in the flow (e.g. forgot-password) can omit the brand
 * mark where it adds visual noise without adding context.
 */
interface AuthShellProps {
  heading: string;
  subtitle: string;
  showLogo?: boolean;
  children: React.ReactNode;
}

export default function AuthShell({
  heading,
  subtitle,
  showLogo = false,
  children,
}: AuthShellProps) {
  return (
    <div className="flex w-full flex-col items-center">
      {showLogo && <div className="mb-12 h-10 w-44 rounded-md bg-slate-600" />}
      <div className="mb-8 text-center">
        <h1 className="text-[30px] font-semibold leading-[38px] text-gray-900">
          {heading}
        </h1>
        <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}

/**
 * BackToLogin — reusable navigation affordance co-located with AuthShell
 * because it is only ever consumed within auth flows. Keeping it here
 * avoids polluting the shared /components/ui directory with a component
 * that has no meaning outside of auth context.
 */
export function BackToLogin() {
  return (
    <Link
      href="/auth/login"
      className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
    >
      <ArrowLeftIcon />
      Back to log in
    </Link>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 8H3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 4L3 8L7 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
