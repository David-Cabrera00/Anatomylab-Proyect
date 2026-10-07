import type { ReactNode } from "react";

type AppShellProps = {
  header: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
};

export function AppShell({ header, sidebar, children }: AppShellProps) {
  return (
    <div className="flex h-screen flex-col bg-slate-50 text-slate-900">
      <header className="shrink-0">{header}</header>
      <div className="flex min-h-0 flex-1">
        <aside className="w-56 shrink-0 overflow-y-auto border-r border-slate-200 bg-white">
          {sidebar}
        </aside>
        <main className="min-h-0 min-w-0 flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
