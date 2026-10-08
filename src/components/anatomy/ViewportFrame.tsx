import type { ReactNode } from "react";

type ViewportFrameProps = {
  children: ReactNode;
  label: string;
  metadata: string;
  hint: string;
};

export function ViewportFrame({ children, label, metadata, hint }: ViewportFrameProps) {
  return (
    <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden bg-canvas p-4">
      <div className="relative h-full min-h-0 overflow-hidden rounded-ds-md border border-line bg-surface">
        <span className="pointer-events-none absolute left-3 top-3 z-10 h-3 w-3 border-l border-t border-line-strong" aria-hidden="true" />
        <span className="pointer-events-none absolute right-3 top-3 z-10 h-3 w-3 border-r border-t border-line-strong" aria-hidden="true" />
        <span className="pointer-events-none absolute bottom-3 left-3 z-10 h-3 w-3 border-b border-l border-line-strong" aria-hidden="true" />
        <span className="pointer-events-none absolute bottom-3 right-3 z-10 h-3 w-3 border-b border-r border-line-strong" aria-hidden="true" />

        <div className="pointer-events-none absolute left-5 top-4 z-10 flex items-center gap-3 text-caption text-ink-subtle">
          <span className="font-semibold uppercase tracking-[0.14em] text-ink-muted">{label}</span>
          <span className="h-3 w-px bg-line-strong" aria-hidden="true" />
          <span>{metadata}</span>
        </div>

        <div className="h-full min-h-0 w-full">{children}</div>

        <p className="pointer-events-none absolute bottom-4 left-5 z-10 text-caption text-ink-subtle">{hint}</p>
      </div>
    </div>
  );
}
