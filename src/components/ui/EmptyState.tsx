import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
  compact?: boolean;
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
  action,
  compact = false,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`structure-detail-enter flex flex-col items-start ${compact ? "sm:flex-row sm:items-center sm:gap-4" : ""} ${className}`}>
      <div
        aria-hidden="true"
        className={`${compact ? "h-10 w-10" : "h-12 w-12"} flex shrink-0 items-center justify-center rounded-ds-md bg-accent-soft text-accent transition-transform duration-300 hover:scale-105`}
      >
        {icon}
      </div>
      <div className={compact ? "min-w-0 flex-1" : ""}>
        <h2 className={`${compact ? "mt-3 sm:mt-0" : "mt-5"} text-heading font-semibold text-ink`}>{title}</h2>
        <p className="mt-2 max-w-prose text-body leading-6 text-ink-muted">{description}</p>
      </div>
      {action ? <div className={`${compact ? "mt-4 sm:mt-0" : "mt-5"} shrink-0`}>{action}</div> : null}
    </div>
  );
}
