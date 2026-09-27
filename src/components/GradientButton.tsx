import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Name kept for backwards compatibility: these are the site's standard buttons.
// primary = violet (one per view), ink = high-contrast neutral, ghost = quiet secondary.
type Variant = "primary" | "ink" | "ghost";
type Size = "md" | "sm";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

const variantCls: Record<Variant, string> = {
  primary: "btn-primary",
  ink: "btn-ink",
  ghost: "btn-ghost",
};

function classes(variant: Variant, size: Size, className?: string) {
  return cn("btn", variantCls[variant], size === "sm" && "btn-sm", className);
}

export function GradientButton({
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: BaseProps & ComponentProps<"button">) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

export function GradientLink({
  children,
  variant = "primary",
  size = "md",
  className,
  to,
}: BaseProps & { to: string }) {
  return (
    <Link to={to} className={classes(variant, size, className)}>
      {children}
    </Link>
  );
}
