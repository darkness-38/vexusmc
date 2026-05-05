import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-xl border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-2 text-[var(--text-primary)] outline-none transition-all duration-300 placeholder:text-[var(--text-muted)] focus:border-[var(--accent-green)] focus:ring-2 focus:ring-[var(--accent-green)]/30",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";

