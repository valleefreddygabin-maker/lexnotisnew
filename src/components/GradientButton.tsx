import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";


type Variant = "primary" | "ghost";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const baseCls =
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50";

const variantCls: Record<Variant, string> = {
  primary:
    "bg-gradient-brand text-primary-foreground shadow-[0_0_40px_oklch(0.62_0.22_290/0.45)] hover:scale-105 hover:shadow-[0_0_65px_oklch(0.62_0.22_290/0.7)] active:scale-[0.98]",
  ghost:
    "border border-black/15 bg-black/5 text-foreground backdrop-blur-md hover:border-black/30 hover:bg-black/10 hover:scale-105 active:scale-[0.98]",
};


export function GradientButton({
  children,
  variant = "primary",
  className = "",
  ...rest
}: BaseProps & ComponentProps<"button">) {
  return (
    <button
      className={`${baseCls} ${variantCls[variant]} ${className}`}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}

export function GradientLink({
  children,
  variant = "primary",
  className = "",
  to,
}: BaseProps & { to: string }) {
  return (
    <Link
      to={to}
      className={`${baseCls} ${variantCls[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </Link>
  );
}
