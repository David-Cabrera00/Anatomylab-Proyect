import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
};

const defaultIcon = (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    className="h-7 w-7"
  >
    <circle cx="16" cy="16" r="10" />
    <circle cx="16" cy="16" r="4" />
    <path d="M16 2v5M16 25v5M2 16h5M25 16h5" />
  </svg>
);

export function EmptyState({
  title,
  description,
  icon = defaultIcon,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-start ${className}`}>
      <div
        aria-hidden="true"
        className="flex h-12 w-12 items-center justify-center rounded-ds-md bg-accent-soft text-accent"
      >
        {icon}
      </div>
      <h2 className="mt-5 text-heading font-semibold text-ink">{title}</h2>
      <p className="mt-2 max-w-prose text-body leading-6 text-ink-muted">
        {description}
      </p>
    </div>
  );
}
