import type { HTMLAttributes } from "react";

type CardVariant = "plain" | "raised" | "floating";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
};

const variantClasses: Record<CardVariant, string> = {
  plain: "bg-surface",
  raised: "bg-surface-raised shadow-ds-raised",
  floating: "bg-surface/95 shadow-ds-floating backdrop-blur",
};

export function Card({
  variant = "plain",
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-ds-lg border border-line ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
