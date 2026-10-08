import type { ReactNode } from "react";
import { useI18n, type TranslationKey } from "../../i18n";
import type { AppView } from "../../views/types";

type AppSidebarProps = {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
};

type NavigationIconName = "home" | "anatomy" | "study" | "quiz" | "progress" | "profile" | "settings";

const primaryNavigation: Array<{ id: AppView; label: TranslationKey; icon: NavigationIconName }> = [
  { id: "home", label: "navHome", icon: "home" },
  { id: "anatomy", label: "navAnatomy", icon: "anatomy" },
  { id: "study", label: "navStudy", icon: "study" },
  { id: "quiz", label: "navQuiz", icon: "quiz" },
  { id: "progress", label: "navProgress", icon: "progress" },
];

const secondaryNavigation: Array<{ id: AppView; label: TranslationKey; icon: NavigationIconName }> = [
  { id: "profile", label: "navProfile", icon: "profile" },
  { id: "settings", label: "navSettings", icon: "settings" },
];

function NavigationIcon({ name }: { name: NavigationIconName }) {
  const commonProps = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
  };

  const paths: Record<NavigationIconName, ReactNode> = {
    home: <path {...commonProps} d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z" />,
    anatomy: <><circle {...commonProps} cx="12" cy="12" r="8.5" /><path {...commonProps} d="M12 3.5v17M3.5 12h17M8.5 7.5c1.2 1.1 2.1 2.7 2.1 4.5s-.9 3.4-2.1 4.5M15.5 7.5c-1.2 1.1-2.1 2.7-2.1 4.5s.9 3.4 2.1 4.5" /></>,
    study: <><path {...commonProps} d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" /><path {...commonProps} d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20M8 7h8M8 10h6" /></>,
    quiz: <><circle {...commonProps} cx="12" cy="12" r="8.5" /><path {...commonProps} d="M9.7 9.3a2.5 2.5 0 1 1 4.4 1.6c-.8.8-2.1 1.2-2.1 2.6M12 16.5h.01" /></>,
    progress: <><path {...commonProps} d="M5 19V9M12 19V5M19 19v-7" /><path {...commonProps} d="M3 19h18" /></>,
    profile: <><circle {...commonProps} cx="12" cy="8" r="3.2" /><path {...commonProps} d="M5.5 20a6.5 6.5 0 0 1 13 0" /></>,
    settings: <><circle {...commonProps} cx="12" cy="12" r="3" /><path {...commonProps} d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.1h-2.6v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.5-1H6.4v-2.6h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.1H15v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1V14h-.1a1.7 1.7 0 0 0-1.5 1Z" /></>,
  };

  return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0">{paths[name]}</svg>;
}

export function AppSidebar({ currentView, onNavigate }: AppSidebarProps) {
  const { t } = useI18n();

  const renderItem = ({ id, label, icon }: { id: AppView; label: TranslationKey; icon: NavigationIconName }) => {
    const isActive = currentView === id;
    return (
      <button
        key={id}
        type="button"
        aria-current={isActive ? "page" : undefined}
        onClick={() => onNavigate(id)}
        className={`relative flex w-full items-center gap-3 rounded-ds-sm px-3 py-2.5 text-left text-label font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          isActive
            ? "bg-accent-soft text-accent before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:rounded-full before:bg-accent"
            : "text-ink-muted hover:bg-canvas-muted hover:text-ink"
        }`}
      >
        <NavigationIcon name={icon} />
        <span className="min-w-0 truncate">{t(label)}</span>
      </button>
    );
  };

  return (
    <nav className="flex h-full flex-col gap-6 overflow-y-auto bg-surface p-4" aria-label={t("navMain")}>
      <div className="space-y-1">{primaryNavigation.map(renderItem)}</div>
      <div className="border-t border-line pt-5">
        <p className="mb-3 px-2 text-caption font-semibold uppercase tracking-wider text-ink-subtle">
          {t("navAccount")}
        </p>
        <div className="space-y-1">{secondaryNavigation.map(renderItem)}</div>
      </div>
    </nav>
  );
}
