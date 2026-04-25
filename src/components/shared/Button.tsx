import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "crisis" | "header-crisis";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkButtonProps = CommonProps & {
  href: string;
};

function cn(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getVariantClasses(variant: ButtonVariant) {
  switch (variant) {
    case "secondary":
      return "border border-[var(--color-border)] bg-transparent text-[var(--color-text)] hover:border-[var(--color-text)]/20 hover:bg-[var(--color-surface)]";
    case "crisis":
      return "bg-[var(--color-crisis-button)] text-[var(--color-crisis-button-text)] hover:bg-[#e8d8c6]";
    case "header-crisis":
      return "bg-[var(--color-accent)] text-white hover:bg-[#9f4d2f]";
    case "primary":
    default:
      return "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]";
  }
}

function getBaseClasses(variant: ButtonVariant) {
  const size =
    variant === "crisis"
      ? "px-[1.35rem] py-4 font-bold"
      : variant === "header-crisis"
        ? "px-4 py-[0.65rem] font-bold"
        : "px-5 py-[0.9rem] font-semibold";

  return cn(
    "inline-flex items-center justify-center rounded-[var(--radius-pill)] outline-offset-4 transition-colors duration-150",
    "min-h-12 whitespace-nowrap",
    "focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]",
    "focus-visible:ring-4 focus-visible:ring-[color:rgba(232,212,200,0.9)]",
    size,
    getVariantClasses(variant),
  );
}

export function Button({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(getBaseClasses(variant), className)}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  className,
  href,
  variant = "primary",
}: LinkButtonProps) {
  return (
    <Link className={cn(getBaseClasses(variant), className)} href={href}>
      {children}
    </Link>
  );
}
