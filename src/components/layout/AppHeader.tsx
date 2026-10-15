import type { ReactNode } from "react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { ThemeToggle } from "../ThemeToggle";
import { useI18n, type TranslationKey } from "../../i18n";
import type { AppView } from "../../views/types";
import { getUserInitials, type CurrentUser } from "../../utils/user";

type AppHeaderProps = {
  currentView: AppView;
  search?: ReactNode;
  user?: CurrentUser;
  onNavigate?: (view: AppView) => void;
};

const viewTitleKeys: Record<AppView, TranslationKey> = {
  login: "authLoginTitle",
  register: "authRegisterTitle",
  home: "navHome",
  anatomy: "navAnatomy",
  study: "navStudy",
  quiz: "navQuiz",
  progress: "navProgress",
  profile: "navProfile",
  settings: "navSettings",
};

export function AppHeader({ currentView, search, user, onNavigate }: AppHeaderProps) {
  const { t } = useI18n();
  const initials = getUserInitials(user?.name, user?.email);
  const userLabel = user?.name || user?.email || t("navProfile");

  return (
    <div className="app-header flex h-16 items-center justify-between border-b border-line bg-surface px-6">
      <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-6">
        <div className="shrink-0">
          <h1 className="text-heading font-semibold tracking-tight text-ink">{t("appName")}</h1>
          <p className="text-caption text-ink-subtle">{t(viewTitleKeys[currentView])}</p>
        </div>
        {search}
      </div>

      <div className="ml-4 flex shrink-0 items-center gap-2 lg:gap-3">
        <LanguageSwitcher />
        <ThemeToggle />
        <button
          type="button"
          onClick={() => onNavigate?.("profile")}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-caption font-semibold text-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label={`${t("navProfile")}: ${userLabel}`}
          title={userLabel}
        >
          {initials}
        </button>
      </div>
    </div>
  );
}
