import { useI18n, type TranslationKey } from "../../i18n";
import type { AppView } from "../../views/types";

type AppSidebarProps = {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
};

const primaryNavigation: Array<{ id: AppView; label: TranslationKey }> = [
  { id: "home", label: "navHome" },
  { id: "anatomy", label: "navAnatomy" },
  { id: "study", label: "navStudy" },
  { id: "quiz", label: "navQuiz" },
  { id: "progress", label: "navProgress" },
];

const secondaryNavigation: Array<{ id: AppView; label: TranslationKey }> = [
  { id: "profile", label: "navProfile" },
  { id: "settings", label: "navSettings" },
];

export function AppSidebar({ currentView, onNavigate }: AppSidebarProps) {
  const { t } = useI18n();

  const renderItem = ({ id, label }: { id: AppView; label: TranslationKey }) => {
    const isActive = currentView === id;
    return (
      <button
        key={id}
        type="button"
        aria-current={isActive ? "page" : undefined}
        onClick={() => onNavigate(id)}
        className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
          isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`}
      >
        {t(label)}
      </button>
    );
  };

  return (
    <nav className="flex h-full flex-col gap-6 overflow-y-auto p-4" aria-label={t("navMain")}>
      <div className="space-y-1">{primaryNavigation.map(renderItem)}</div>
      <div className="border-t border-slate-200 pt-5">
        <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          {t("navAccount")}
        </p>
        <div className="space-y-1">{secondaryNavigation.map(renderItem)}</div>
      </div>
    </nav>
  );
}
