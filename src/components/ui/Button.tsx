import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  selected?: boolean;
  align?: "center" | "start";
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-accent bg-accent text-white hover:border-accent-hover hover:bg-accent-hover active:bg-accent-hover",
  secondary:
    "border-line-strong bg-surface text-ink hover:bg-canvas-muted active:bg-accent-soft",
  ghost:
    "border-transparent bg-transparent text-ink-muted hover:bg-canvas-muted hover:text-ink active:bg-accent-soft",
  danger:
    "border-error bg-error text-white hover:bg-error/90 active:bg-error/80",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 px-3 py-2 text-label",
  md: "min-h-10 px-4 py-2 text-body",
  lg: "min-h-11 px-5 py-2.5 text-body",
  icon: "h-10 w-10 p-0 text-body",
};

export function Button({
  variant = "secondary",
  size = "md",
  selected = false,
  align = "center",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const appearance = selected
    ? "border-accent/20 bg-accent-soft text-accent hover:bg-accent-soft active:bg-accent-soft"
    : variantClasses[variant];

  return (
    <button
      type={type}
      data-selected={selected || undefined}
      className={`inline-flex shrink-0 items-center ${align === "start" ? "justify-start" : "justify-center"} gap-2 rounded-ds-sm border font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:shadow-none ${sizeClasses[size]} ${appearance} ${className}`}
      {...props}
    />
  );
}
