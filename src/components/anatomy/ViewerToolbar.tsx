import type { ReactNode } from "react";

import { Button } from "../ui";
import { useI18n } from "../../i18n";

type ViewerToolbarProps = {
  hasSelection: boolean;
  onIsolate: () => void;
  onHide: () => void;
  onTransparency: () => void;
  onReset: () => void;
};

export function ViewerToolbar({ hasSelection, onIsolate, onHide, onTransparency, onReset }: ViewerToolbarProps) {
  const { t } = useI18n();
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-5 z-30 flex justify-center px-4">
      <div role="toolbar" aria-label={t("anatomyViewerControls")} className="pointer-events-auto flex max-w-full flex-wrap items-center justify-center gap-1 rounded-ds-md border border-line bg-surface/95 p-1.5 shadow-ds-floating backdrop-blur-sm">
        <ToolbarButton label={t("anatomyIsolate")} disabled={!hasSelection} onClick={onIsolate} icon={<IsolateIcon />} />
        <ToolbarButton label={t("anatomyHide")} disabled={!hasSelection} onClick={onHide} icon={<HideIcon />} />
        <ToolbarButton label={t("anatomyTransparency")} disabled={!hasSelection} onClick={onTransparency} icon={<TransparencyIcon />} />
        <ToolbarButton label={t("anatomyReset")} onClick={onReset} icon={<ResetIcon />} variant="secondary" />
      </div>
    </div>
  );
}

function ToolbarButton({ label, icon, onClick, disabled = false, variant = "ghost" }: { label: string; icon: ReactNode; onClick: () => void; disabled?: boolean; variant?: "ghost" | "secondary" }) {
  return (
    <Button variant={variant} size="sm" disabled={disabled} onClick={onClick} className="gap-1.5 whitespace-nowrap">
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Button>
  );
}

function Icon({ children }: { children: ReactNode }) {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">{children}</svg>;
}

function IsolateIcon() { return <Icon><path d="M4 4h5M4 4v5M16 4h-5M16 4v5M4 16h5M4 16v-5M16 16h-5M16 16v-5" /></Icon>; }
function HideIcon() { return <Icon><path d="M3 3l14 14M8.5 8.5a2.2 2.2 0 0 0 3 3M6.5 5.8A10 10 0 0 1 10 5c4.8 0 7.3 5 7.3 5a12 12 0 0 1-2.2 3M4.9 7.2C3.5 8.4 2.7 10 2.7 10s2.5 5 7.3 5c1.1 0 2-.2 2.8-.5" /></Icon>; }
function TransparencyIcon() { return <Icon><circle cx="10" cy="10" r="6.5" /><path d="M3.5 10h13M10 3.5c2 1.8 3 3.9 3 6.5s-1 4.7-3 6.5M10 3.5c-2 1.8-3 3.9-3 6.5s1 4.7 3 6.5" /></Icon>; }
function ResetIcon() { return <Icon><path d="M4 9a6 6 0 1 1 1.8 4.3" /><path d="M4 4v5h5" /></Icon>; }
