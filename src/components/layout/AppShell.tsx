import type { ReactNode } from "react";

type AppShellProps = {
  header: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
};

export function AppShell({ header, sidebar, children }: AppShellProps) {
  return (
    <div className="flex h-screen flex-col bg-canvas text-ink">
      <header className="shrink-0">{header}</header>
      <div className="flex min-h-0 flex-1">
        <aside className="w-56 shrink-0 overflow-y-auto border-r border-line bg-surface">
          {sidebar}
        </aside>
        <main className="min-h-0 min-w-0 flex-1 overflow-hidden bg-canvas">{children}</main>
      </div>
    </div>
  );
}
