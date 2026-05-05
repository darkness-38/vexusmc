import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantClass: Record<Variant, string> = {
  primary:
    "bg-[var(--accent-green)] text-black hover:shadow-glowGreen hover:scale-[1.02]",
  secondary:
    "bg-transparent border border-[var(--accent-green)] text-[var(--accent-green)] hover:bg-[var(--accent-green)]/10",
  ghost: "bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]",
  danger: "bg-[var(--danger)] text-white hover:opacity-90",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed",
          variantClass[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

