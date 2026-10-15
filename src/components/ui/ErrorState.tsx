import { Button } from "./Button";

type ErrorStateProps = {
  title: string;
  description: string;
  retryLabel: string;
  onRetry: () => void;
};

export function ErrorState({ title, description, retryLabel, onRetry }: ErrorStateProps) {
  return (
    <div className="border-l-2 border-error bg-error-soft/35 px-4 py-5" role="alert">
      <p className="text-body font-medium text-ink">{title}</p>
      <p className="mt-1 text-label leading-5 text-ink-muted">{description}</p>
      <Button type="button" variant="secondary" size="sm" onClick={onRetry} className="mt-4">
        {retryLabel}
      </Button>
    </div>
  );
}
