import { cn } from "@/lib/cn";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const BASE =
  "inline-flex h-10 items-center justify-center gap-2 rounded-full px-5 text-[14px] font-medium transition-all duration-200";

export const adminButtonStyles = {
  primary: cn(
    BASE,
    "bg-accent text-white hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-12px_rgba(47,111,111,0.55)]",
  ),
  secondary: cn(
    BASE,
    "border border-[var(--mwg-line)] bg-paper-raised text-[var(--mwg-ink-70)] hover:border-ink hover:text-ink",
  ),
};

interface AdminButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export function AdminButton({
  children,
  variant = "secondary",
  className,
  ...props
}: AdminButtonProps) {
  return (
    <button
      type="button"
      className={cn(adminButtonStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function AdminPrimaryButton(props: Omit<AdminButtonProps, "variant">) {
  return <AdminButton variant="primary" {...props} />;
}

export function AdminSecondaryButton(props: Omit<AdminButtonProps, "variant">) {
  return <AdminButton variant="secondary" {...props} />;
}

interface AdminLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function AdminLink({
  href,
  children,
  variant = "secondary",
  className,
}: AdminLinkProps) {
  return (
    <Link href={href} className={cn(adminButtonStyles[variant], className)}>
      {children}
    </Link>
  );
}

export function AdminPrimaryLink(props: Omit<AdminLinkProps, "variant">) {
  return <AdminLink variant="primary" {...props} />;
}
