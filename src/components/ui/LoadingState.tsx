type LoadingStateProps = {
  label: string;
  className?: string;
};

export function LoadingState({ label, className = "" }: LoadingStateProps) {
  return (
    <div className={`space-y-3 py-5 ${className}`} role="status" aria-live="polite" aria-label={label}>
      <span className="sr-only">{label}</span>
      <div className="h-3 w-2/5 animate-pulse rounded-full bg-canvas-muted" />
      <div className="h-3 w-4/5 animate-pulse rounded-full bg-canvas-muted" />
      <div className="h-3 w-3/5 animate-pulse rounded-full bg-canvas-muted" />
    </div>
  );
}
